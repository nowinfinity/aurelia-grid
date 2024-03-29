import { child, bindable, autoinject, BindingEngine, customElement, processContent, TargetInstruction, bindingMode } from 'aurelia-framework';
import { GridColumn } from './grid-column';
import { GridColumnsExpander } from './grid-columns-expander';
import { ViewCompiler, ViewSlot, ViewResources, Container } from 'aurelia-framework';
import { Pager } from "./pager";
import { ExportToExcel } from './export-to-excel';
import { ExportToCsv } from './export-to-csv';
import { ExportToPdf } from './export-to-pdf';
import { CheckedAll, CheckBoxStatus, CheckBoxState } from "./checked-all";


@customElement('grid')
@processContent(function (viewCompiler, viewResources, element, instruction) {
    // Do stuff
    var result = processUserTemplate(element);
    instruction.gridColumns = result.columns;
    instruction.rowAttrs = result.rowAttrs;
    instruction.expanderAttrs = result.expander;

    return true;
})

@autoinject()
export class Grid {
    subscription: any;
    showNoRowsMessage: boolean = false;
    debouncedUpdateFilters: any;
    isBound: boolean = false;

    @child('pager') pager: Pager;
    /* == Styling == */
    @bindable gridHeight = 0;
    @bindable class = "";
    /* == Options == */

    // Initial load flag (for client side)
    @bindable initialLoad = true;

    @bindable model: any;

    //callbacks
    @bindable dataBoundCallback = undefined;

    //Checked All
    @bindable showAllCheckbox: boolean;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) checkedAll: boolean;
    checkBoxEnum = CheckBoxStatus;
    selected: string[] = [];
    selectedCount: number = 0;

    // Filtering
    @bindable showColumnFilters = false;
    @bindable serverFiltering = false;
    @bindable filterDebounce = 500;
    @bindable showColName: string = "";

    // custom filtering
    @bindable filteringSettings = null;
    @bindable filteringByProperty = false;

    // Pagination
    @bindable serverPaging = false;
    @bindable pageable = true;
    @bindable pageSize = 10;
    @bindable page = 1;
    @bindable pagerSize = 3;

    @bindable showPageSizeBox = true;
    @bindable showPagingSummary = true;
    @bindable showFirstLastButtons = true;
    @bindable showJumpButtons = true;
    @bindable hideJumpButtonsIfNotPossible = true;

    @bindable pageSizes = [10, 25, 50, 100];

    @bindable indexColumn: boolean = false;

    @bindable sortField: string;

    firstVisibleItem = 0;
    lastVisibleItem = 0;

    pageNumber = 1;

    // Sortination
    @bindable serverSorting = false;
    @bindable sortable: boolean = true;
    @bindable customSorting: boolean = true;
    sortProcessingOrder = []; // Represents which order to apply sorts to each column
    sorting = {};
    sortedData = [];

    // Searching
    @bindable search: string = "";
    @bindable searchColumns : Array<string> = [];

    // Burnination?
    Trogdor = true;

    // Column defs
    @bindable autoGenerateColumns;
    @bindable showColumnHeaders = true;
    columnHeaders = [];
    columns = [];

    get visibleColumns() {
        return this.columns.filter(c => !c.hiddenCol);
    }

    get displayedColumns() {
        return this.visibleColumns.filter(c => this.isDisplayColumn(c.showColNameIf, c.hideColNameIf, this.showColName) && c.field != "#");
    }

    get exportedColumns() {
        return this.visibleColumns.filter(c => this.isDisplayColumn(c.showColNameIf, c.hideColNameIf, this.showColName) && c.field != "#" && JSON.parse(c.export));
    }

    // Selection
    @bindable selectable = false;
    @bindable selectedItem = null;

    // Misc
    @bindable noRowsMessage = "";

    // Data ....
    @bindable autoLoad = true;
    loading = false;
    @bindable loadingMessage = "Loading...";

    // Read
    @bindable read = null;
    @bindable onReadError = null;

    // Tracking
    cache = [];
    data = [];
    currentSortedData = [];
    count = 0;

    // Subscription handling
    unbinding = false;

    // Visual
    // TODO: calc scrollbar width using browser
    scrollBarWidth = 16;

    // Templating
    viewSlot;
    rowTemplate;
    rowAttrs;

    expanderAttrs;

    constructor(
        private element: Element,
        public viewCompiler: ViewCompiler,
        public viewResources: ViewResources,
        public container: Container,
        private targetInstruction: TargetInstruction,
        public bindingEngine: BindingEngine,
        public checkbox: CheckedAll
    ) {
        var behavior = (<any>targetInstruction).behaviorInstructions[0];

        this.columns = behavior.gridColumns;
        this.rowAttrs = behavior.rowAttrs;

        this.expanderAttrs = behavior.expanderAttrs;
    }

    /* === Lifecycle === */
    attached() {
        this.gridHeightChanged();
        if (this.autoLoad) {
            this.refresh();
        }
    }

    parent: any;


    bind(executionContext) {
        if (this.isBound) {
            return;
        }
        this.isBound = true;

        if (this.sortField) {
            var sort = this.parseSortValue(this.sortField);
            this.sortBySingleFieldChangeValues(sort.field, sort.direction)
        }

        this.visibleColumns.forEach(item => {
            if (item.filtering === 'true') {
                this.sortBySingleField(item.field, 'desc');
            }
        });

        this.parent = executionContext;
        this["$parent"] = executionContext;

        this.indexColumnChanged(this.indexColumn, this.columns && this.columns[0].field == "#");

        // Ensure the grid settings
        // If we can page on the server and we can't server sort, we can't sort locally
        if (this.serverPaging && !this.serverSorting)
            this.sortable = false;

        // The table body element will host the rows
        var body = this.element.querySelector(".table-content");

        if (this.expanderAttrs != null)
            body = this.element.querySelector(".grid-container");

        this.viewSlot = new ViewSlot(body, true);

        // Get the row template too and add a repeater/class
        var row = body.querySelector("div.table-row");
        if (this.expanderAttrs != null) {
            let tableContainer = document.createElement("div");
            tableContainer.setAttribute("class", "table-container");
            tableContainer.setAttribute("repeat.for", "$item of data");
            for (var prop in this.rowAttrs) {

                if (this.rowAttrs.hasOwnProperty(prop)) {
                    row.setAttribute(prop, this.rowAttrs[prop]);
                }
            }
            tableContainer.appendChild(row);
            var innerDiv = document.createElement("div");
            innerDiv.setAttribute("class", "inner-container");
            innerDiv.setAttribute("style", "display:none");

            innerDiv.innerHTML = '<compose  view-model="' + this.expanderAttrs.viewModel + '"      model.bind="' + this.expanderAttrs.model + '"  ></compose>';
            //view="'+ this.expanderAttrs.viewModel+'"

            tableContainer.appendChild(innerDiv);

            this.rowTemplate = document.createDocumentFragment();
            this.rowTemplate.appendChild(tableContainer);
            this.buildTemplates();
            return;
        }

        this.addRowAttributes(row);
        this.rowTemplate = document.createDocumentFragment();
        this.rowTemplate.appendChild(row);
        this.buildTemplates();
    }

    addRowAttributes(row) {
        row.setAttribute("repeat.for", "$item of data");
        //row.setAttribute("class", "${ $item === $parent.selectedItem ? 'info' : '' }");
        // TODO: Do we allow the user to customise the row template or just
        // provide a callback?
        // Copy any user specified row attributes to the row template	
        for (var prop in this.rowAttrs) {

            if (this.rowAttrs.hasOwnProperty(prop)) {
                if (prop == "class") {
                    row.setAttribute(prop, row.getAttribute(prop) + " " + this.rowAttrs[prop]);
                }
                else {
                    row.setAttribute(prop, this.rowAttrs[prop]);
                }
            }
        }
    }
    
    buildTemplates() {
        // Create a fragment we will manipulate the DOM in
        var rowTemplate = this.rowTemplate.cloneNode(true);

        var row = rowTemplate.querySelector("div.table-row");

        // Create the columns
        this.columns.filter(c => !c.hiddenCol).forEach(c => {
            var td = document.createElement("div");
            // Set attributes
            for (var prop in c) {
                if (c.hasOwnProperty(prop)) {

                    if (prop == "template")
                        td.innerHTML = c[prop];
                    else {
                        td.setAttribute(prop, c[prop]);
                    }
                }
            }

            if (this.showColName != "")
                td.setAttribute("if.bind", "isDisplayColumn('" + c['show-col-name-if'] + "' ,'" + c['hide-col-name-if'] + "',showColName)");

            row.appendChild(td);
        });

        // Now compile the row template
        var view = this.viewCompiler.compile(rowTemplate, this.viewResources).create(this.container);
        // Templating 17.x changes the API
        // ViewFactory.create() no longer takes a binding context (2nd parameter)
        // Instead, must call view.bind(context)
        view.bind(this);

        // based on viewSlot.swap() from templating 0.16.0
        let removeResponse = this.viewSlot.removeAll();

        if (removeResponse instanceof Promise) {
            removeResponse.then(() => this.viewSlot.add(view));
        }

        this.viewSlot.add(view);

        // code above replaces the following call
        //this.viewSlot.swap(view);
        this.viewSlot.attached();

        // HACK: why is the change handler not firing for noRowsMessage?
        this.noRowsMessageChanged();
    }

    unbind() {
        this.unbinding = true;
        this.dontWatchForChanges();
    }

    /* === Column handling === */
    addColumn(col) {

        // No-sort if grid is not sortable
        if (!this.sortable)
            col.nosort = true;

        this.columns.push(col);
    }

    indexColumnChanged(newValue: boolean, oldValue: boolean) {
        if (!oldValue && newValue) {
            this.columns.unshift(new GridColumn({ field: "#", class: "table-cell" }, "${ $item.rowNum }"));
        }

        if (oldValue && !newValue) {
            this.columns.shift();
        }
    }

    removeRows(func: Function) {
        if (!func)
            return;

        this.cache = this.cache.filter(r => !func(r));

        this.refresh(true);
    }

    /* === Paging === */
    pageChanged(page, oldValue) {
        if (page === oldValue) return;

        this.pageNumber = Number(page);

        if (this.pageNumber < 1) this.pageNumber = 1;

        this.refresh(true);
    }

    pageSizeChanged(newValue, oldValue) {
        if (newValue === oldValue) return;

        this.pageChanged(1, oldValue);
        this.updatePager();
    }

    filterSort(data) {
        if (this.showColumnFilters && !this.serverFiltering)
            data = this.applyFilter(data);

        if (this.filteringSettings && this.filteringSettings.filterFunction)
            data = data.filter(row => this.filteringSettings.filterFunction(row));

        //Searching
        if (this.search && !this.serverPaging)
            data = this.applySearch(data);

        // Count the data now before the sort/page
        if (!this.serverPaging)
            this.count = data.length;

        // 2. Now sort the data
        if ((this.sortable || this.customSorting) && !this.serverSorting)
            data = this.applySort(data);

        return data;
    }

    filterSortPage(data) {
        // Applies filter, sort then page
        // 1. First filter the data down to the set we want, if we are using local data
        var tempData = this.filterSort(data)
        this.currentSortedData = tempData;

        // 3. Now apply paging
        if (this.pageable && !this.serverPaging)
            tempData = this.applyPage(tempData);

        for (var i = 0; i < tempData.length; i++) {
            tempData[i].rowNum = (this.pageNumber - 1) * this.pageSize + i + 1;
        }

        this.data = tempData;

        this.updatePager();

        this.watchForChanges();
    }

    applyPage(data) {
        var start = (Number(this.pageNumber) - 1) * Number(this.pageSize);
        data = data.slice(start, start + Number(this.pageSize));

        return data;
    }


    updatePager() {
        if (this.pager)
            this.pager.update(this.pageNumber, Number(this.pageSize), Number(this.count));

        this.firstVisibleItem = (this.pageNumber - 1) * Number(this.pageSize) + 1;
        if (this.firstVisibleItem < 0)
            this.firstVisibleItem = 0;
        this.lastVisibleItem = Math.min((this.pageNumber) * Number(this.pageSize), this.count);
    }

    /* === Sorting === */
    fieldSorter(fields) {
        return function (a, b) {
            return fields
                .map(function (field) {
                    var o = field.sortFieldCode;
                    var pinValue = field.sortPinTopValue;
                    var dir = 1;
                    if (o[0] === '-') {
                        dir = -1;
                        o = o.substring(1);
                    }
                    //empty last
                    if (o[0] === '~') {
                        o = o.substring(1);
                        if (!a[o]) return dir;
                        if (!b[o]) return -dir;

                    }

                    if(pinValue !== '') {
                        if(a[o] === b[o] && a[o] === pinValue) return 0;   
                        if(a[o] === pinValue) return -dir;
                        if(b[o] === pinValue) return dir;
                    }
                    if (!a[o]) return -(dir);
                    if (!b[o]) return dir;
                    var ao = typeof a[o] === 'string' ? a[o].toLowerCase() : a[o];
                    var bo = typeof b[o] === 'string' ? b[o].toLowerCase() : b[o];
                    if (ao > bo) return dir;
                    if (ao < bo) return -(dir);
                    return 0;
                })
                .reduce(function firstNonZeroValue(p, n) {
                    return p ? p : n;
                }, 0);
        };
    }

    pageSizesChanged() {
        this.refresh();
    }

    sortFieldChanged(newValue) {
        var sort = this.parseSortValue(newValue);
        this.sortBySingleField(sort.field, sort.direction)
    }

    parseSortValue(value) {
        var parts = value.split(':');
        var field = parts[0];
        var direction = parts.length > 1 ? parts[1] : "asc";
        return { field: field, direction: direction };
    }

    sortBySingleField(field, direction) {
        this.sortBySingleFieldChangeValues(field, direction);
        this.refresh(true);
    }

    sortBySingleFieldChangeValues(field, direction) {
        this.customSorting = true;
        this.sortProcessingOrder = [field];
        for (var prop in this.sorting) {
            prop = "";
        }

        this.sorting = {};

        this.sorting[field] = direction;
    }

    customSort(column) {
        // check if our column need sorting
        if (column['filtering-by-property'] != 'true') {

            this.sortChanged(column['field']);
            return;
        }

        var element = document.querySelector(".header-" + column.field);

        //close sorting modal
        if (element.querySelector('.sorting-container') != null) {
            if (element.querySelector('.sorting-container').style.display != "none") {
                element.querySelector('.sorting-container').style.display = "none";
                //@TODO refactor all this shit with nicescroll
                //this.removeNiceScroll();
            }
            else {
                element.querySelector('.sorting-container').style.display = "inherit";
                //this.initNiceScroll();
            }
            return;
        }

        [].forEach.call(document.querySelectorAll('.sorting-container'), function (e) {
            e.parentNode.removeChild(e);
        });

        //append sorting modal
        var templ = document.createElement('div');

        var content = document.querySelector('#filtering-template');

        templ.innerHTML = content.innerHTML;

        element.appendChild(templ);

        //apply event listeners
        var _this = this;
        templ.querySelector('.button-green').addEventListener('click', function () {
            _this.applySorting(_this, column);
        }, false);
        templ.querySelector('.button-red').addEventListener('click', function () {
            _this.removeSorting(_this, column);
        }, false);

        //sorting logics
        this.initSorting(column)
    }

    removeSorting(_this, column) {
        [].forEach.call(document.querySelectorAll('.sorting-container'), function (e) {
            e.parentNode.removeChild(e);
        });
        _this.filteringByProperty = false;
        _this.sortedData = [];
        _this.filterSortPage(_this.cache);
        //_this.removeNiceScroll();
    }

    initSorting(column) {

        var columnName = column['field'];

        let uniqueValues = Array.from(new Set(this.cache.map(item => {
            if (Array.isArray(item[columnName])) {
                return item[columnName][0];
            }
            return item[columnName];
        })));

        uniqueValues.sort(function (a, b) {
            if (a === null || b === null) {
                return;
            }
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        var content = document.querySelector('.custom-select');

        uniqueValues.forEach(function (value) {
            var option = document.createElement("option");
            var t = document.createTextNode(value);
            option.appendChild(t);
            option.value = value;
            content.appendChild(option);
        });

        //this.initNiceScroll();
    }

    applySorting(_this, column) {

        let columnName = column['field'];

        let selectionContainer = document.querySelector('.custom-select');

        let searchValuesRaw = selectionContainer.selectedOptions;

        let searchValues = [];

        for (let k of searchValuesRaw) {
            searchValues.push(k.value);
        }

        let data = _this.cache.filter(function (el) {
            if (Array.isArray(el[columnName])) {
                var res = false;
                el[columnName].forEach(function (entry) {
                    if (searchValues.indexOf(entry) > -1) {
                        res = true;
                        return;
                    }
                });
                return res;
            } else
                return searchValues.indexOf(el[columnName]) > -1
        });

        //close sorting modal
        document.querySelector(".header-" + column.field).querySelector('.sorting-container').style.display = "none";

        //update grid config
        _this.filteringByProperty = true;
        _this.sortedData = data;
        _this.pageNumber = 1;
        _this.filterSortPage(data);
        //_this.removeNiceScroll();
    }

	/*dropDownScroll: any;

	initNiceScroll(){
		this.dropDownScroll = $('.custom-select').niceScroll({
			cursorcolor: '#fff',
			background: '#387ac0',
			cursorwidth: 4,
			cursorborder: 0,
			autohidemode: false,
			smoothscroll: false,
			railoffset: {
				left: -10
			},
			railpadding: {
				bottom: 5
			}
		});
	}

	removeNiceScroll(){
		try{
			this.dropDownScroll.remove();
		}catch(e){}
	}*/


    sortChanged(field) {
        // Determine new sort
        var newSort = undefined;

        // Figure out which way this field should be sorting
        switch (this.sorting[field]) {
            case "asc":
                newSort = "desc";
                break;
            case "desc":
                newSort = "asc";
                break;
            case "":
                newSort = "";
                break;
            default:
                newSort = "asc";
                break;
        }

        this.sorting[field] = newSort;
        // If the sort is present in the sort stack, slice it to the back of the stack, otherwise just add it
        var pos = this.sortProcessingOrder.indexOf(field);
        if (pos > -1)
            this.sortProcessingOrder.splice(pos, 1);

        this.sortProcessingOrder.push(field);

        // Apply the new sort
        this.refresh();
    }

    applySort(data) {

        // Format the sort fields
        var fields = [];

        // Get the fields in the "sortingORder"
        for (var i = 0; i < this.sortProcessingOrder.length; i++) {
            var sort = this.sortProcessingOrder[i];

            for (var prop in this.sorting) {
                if (sort == prop && this.sorting[prop] !== "") {
                    var sortProperties = this.sorting[prop];
                    var sortFieldCode = sortProperties;
                    var sortPinTopValue = '';
                    if(sortProperties.indexOf("$") !== -1) {
                        sortFieldCode = "asc";
                        sortPinTopValue = sortProperties.split('$')[1];
                    }
                    switch (sortFieldCode) {
                        case "asc":
                            sortFieldCode = prop;
                            break;
                        case "desc":
                            sortFieldCode = "-" + prop;
                            break;
                        case "asc-empty-last":
                            sortFieldCode = "~" + prop;
                            break;
                    }

                    fields.push({sortFieldCode:sortFieldCode, sortPinTopValue: sortPinTopValue});
                }
            }
        };

        if (!fields.length) {
            return data;
        }

        // If server sort, just refresh
        data = data.sort(this.fieldSorter(fields));

        return data;
    }
    
    /* === Searching === */
    private isRowContainsTerm(rowObj, term) {
        let containsTerm = false;
        term = term.toLowerCase();

        if(Array.isArray(rowObj)){
             for (let element of rowObj) {
                if (element == null) return false;
                let values = Object.values(element).map(value => (value? value: '').toString().toLowerCase());
                
                for (let propertyValue of values) {
                    containsTerm = propertyValue.indexOf(term) > -1;
                    if (containsTerm) return true;
                }
            }
        }
        else {
            return (rowObj? rowObj : '').toString().toLowerCase().indexOf(term) > -1;
        }

        return false;
    }

    applySearch(data) {
        return data.filter((row) => {
            if (this.searchColumns.length > 0) {

                for (var i = 0; i < this.searchColumns.length; i++) {
                    let colName = this.searchColumns[i];

                    if (row[colName] && this.isRowContainsTerm(row[colName], this.search))
                        return true;
                }
            }
            else {
                for (var i = this.columns.length - 1; i >= 0; i--) {
                    var col = this.columns[i];
                    if (row[col.field] && this.isRowContainsTerm(row[col.field], this.search))
                        return true;
                }
            }

            return false;
        });
    }

    searchChanged() {

        this.refresh();

        if (this.selected.length > 0) {
            this.checkbox.current.count = this.count;
            this.updateState();

        }
    }

    /* === Filtering === */
    applyFilter(data) {
        return data.filter((row) => {
            var include = true;

            for (var i = this.columns.length - 1; i >= 0; i--) {
                var col = this.columns[i];

                if (col.filterValue !== "" && row[col.field] && row[col.field].toString().indexOf(col.filterValue) === -1) {
                    include = false;
                }
            }

            return include;
        });
    }



    isDisplayColumn(showCols: string, hideCols: string, column): boolean {
        if (this.showColName == "") return true;

        if (showCols != "undefined" && showCols != undefined) {
            let columns = showCols.split("|");

            return columns.indexOf(this.showColName) > -1;
        }

        if (hideCols != "undefined" && hideCols != undefined) {
            let columns = hideCols.split("|");

            return !(columns.indexOf(this.showColName) > -1);
        }

        return true;
    }

    getFilterColumns() {
        var cols = {};

        for (var i = this.columns.length - 1; i >= 0; i--) {
            var col = this.columns[i];

            if (col.filterValue !== "")
                cols[col.field] = col.filterValue;
        }

        return cols;
    }

    debounce(func, wait) {
        var timeout;

        // the debounced function
        return function () {

            var context = this,
                args = arguments;

            // nulls out timer and calls original function
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };

            // restart the timer to call last function
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    updateFilters() {
        // Debounce

        if (!this.debouncedUpdateFilters) {
            this.debouncedUpdateFilters = this.debounce(this.refresh.bind(this), this.filterDebounce || 100);
        }

        this.debouncedUpdateFilters();
    }

    /* === Data === */
    refresh(stayOnCurrentPage: boolean = false) {
        // If we have any server side stuff we need to get the data first
        if (!stayOnCurrentPage) {
            this.pageNumber = 1;
            this.updatePager();
        }

        this.dontWatchForChanges();

        if (this.serverPaging || this.serverSorting || this.serverFiltering || this.initialLoad)
            this.getData();
        else if (this.filteringByProperty)
            this.filterSortPage(this.sortedData);
        else
            this.filterSortPage(this.cache);

    }

    reload() {
        this.initialLoad = true;
        this.refresh();
    }

    getData() {
        if (!this.read)
            throw new Error("No read method specified for grid");

        this.initialLoad = false;

        // TODO: Implement progress indicator
        this.loading = true;

        // Try to read from the data adapter
        this.read({
            sorting: this.sorting,
            paging: { page: this.pageNumber, size: Number(this.pageSize) },
            filtering: this.getFilterColumns()
        })
            .then((result) => {

                // Data should be in the result so grab it and assign it to the data property
                this.handleResult(result);

                this.loading = false;

                if(this.dataBoundCallback){
                    this.dataBoundCallback();
                }
            }, (result) => {
                // Something went terribly wrong, notify the consumer
                if (this.onReadError)
                    this.onReadError(result);

                this.loading = false;
            });
    }

    handleResult(result) {

        // TODO: Check valid stuff was returned
        var data = result.data;
        // Is the data being paginated on the client side?
        // TODO: Work out when we should we use the cache... ever? If it's local data
        if (this.pageable && !this.serverPaging && !this.serverSorting && !this.serverFiltering) {
            // Cache the data
            this.cache = result.data;
            this.filterSortPage(this.cache);
        } else {
            this.data = result.data;
            this.count = result.count;
            this.filterSortPage(this.data);
        }
        // Update the pager - maybe the grid options should contain an update callback instead of reffing the
        // pager into the current VM?
        if (!this.filteringSettings)
            this.updatePager();
    }

    watchForChanges() {
        this.dontWatchForChanges();
        // Guard against data refresh events hitting after the user does anything that unloads the grid
        if (!this.unbinding) {
            // We can update the pager automagically
            this.subscription = this.bindingEngine
                .collectionObserver(this.cache)
                .subscribe((splices) => {
                    this.refresh();
                });
        }
    }

    dontWatchForChanges() {
        if (this.subscription)
            this.subscription.dispose();
    }

    /* === Selection === */

    select(item) {
        if (this.selectable)
            this.selectedItem = item;

        return true;
    }

    /* === Change handlers === */
    noRowsMessageChanged() {
        this.showNoRowsMessage = this.noRowsMessage !== "";
    }

    gridHeightChanged() {

        // TODO: Make this a one off
        var cont = this.element.querySelector(".table-content");

        if (this.gridHeight > 0) {
            cont.setAttribute("style", "height:" + this.gridHeight + "px");
        } else {
            cont.removeAttribute("style");
        }
    }

    getTableData(columns = null) {
        var data = this.selected.length? this.cache.filter(item => this.selected.includes(item.Id)): this.filterSort(this.cache);


        var tableData = data.map(d => {
            return columns.map(c => {
                var view = this.viewCompiler.compile("<template>" + this.removeOneLevelD(c.template) + "</template>", this.viewResources).create(this.container);
                view.bind({ item: d });
                return view.fragment.textContent.replace(/(\r\n|\n|\r)/gm, "").trim();
            });
        });

        return tableData;
    }

    private removeOneLevelD(template: string): string {
        var i = 0;
        var inBlock = false;
        while (template.length > i + 1) {
            if (template[i] == '$' && template[i + 1] == "{") {
                inBlock = true;
                i++;
            }

            if (inBlock && template[i] == "$") {
                template = template.slice(0, i) + template.slice(i + 1);
            }

            if (inBlock && template[i] == '}') {
                inBlock = false;
            }

            i++;
        }

        return template;
    }

    exportToExcel() {
        var columns = this.exportedColumns;
        ExportToExcel.export(this.getTableData(columns), columns.map(c => c.heading), 'grid');
    }

    exportToCsv() {
        var columns = this.exportedColumns;
        ExportToCsv.export(this.getTableData(columns), columns.map(c => c.heading), 'grid');
    }

    exportToPdf() {
        var columns = this.exportedColumns;
        ExportToPdf.export(this.getTableData(columns), columns.map(c => c.heading), 'grid');
    }
    exportToExcelWithHeaders(data, headers, name) {
        ExportToExcel.export(data, headers, name);
    }

    exportToCsvWithHeaders(data, headers, name) {
        ExportToCsv.export(data, headers, name);
    }
    exportToPdfWithHeaders(data, headers, name) {
        ExportToPdf.export(data, headers, name);
    }


    checkUnchek(id, updateState: boolean = true) {

        if ((this.isChecked(id)))
            this.selected.splice(this.selected.indexOf(id), 1);
        else if (this.checkedAll || updateState)
            this.selected.push(id);

        this.updateState(updateState);
    }

    setCheckBoxState(filterValue: string, statusFilter: string = "", selected: number = 0, updateState: boolean = false, gridCount?: number) {

        let status: CheckBoxStatus;

        if (!updateState) {
            status = this.checkedAll ? CheckBoxStatus.Checked : CheckBoxStatus.UnChecked;
        } else
        {
            status =  this.checkbox.current != null ? this.checkbox.current.checkBoxStatus : null
        }

        this.checkbox.update = true;

        let count = gridCount || this.count;

        this.checkbox.setState(filterValue, statusFilter, count, selected, status);

    }

    updateState(updateState: boolean = true) {

        if (updateState && this.checkbox.current.selected == 0) {

            this.checkbox.current.checkBoxStatus = CheckBoxStatus.UnChecked;

            this.checkbox.update = true;

            this.checkedAll = false;

            return;

        }

        if (updateState && this.checkbox.current.selected == this.checkbox.current.count) {

            this.checkbox.current.checkBoxStatus = CheckBoxStatus.Checked;

            this.checkbox.update = false;

            this.checkedAll = true;

            return;
        }

        if (updateState && this.checkbox.current.selected < this.checkbox.current.count) {

            this.checkbox.update = false;

            this.checkbox.current.checkBoxStatus = CheckBoxStatus.NotAllChacked;

            this.checkedAll = true;
        }
    }

    isChecked(id: string) {
        return this.selected.indexOf(id) > -1;
    }

    uncheckSelected() {

        if(this.selectedCount == 0)
            return;

        this.selectedCount = 0;

        this.selected = [];

        this.checkbox.current.checkBoxStatus = CheckBoxStatus.UnChecked;

        this.checkbox.current.selected = 0;
	
	this.checkedAll = false;
    }
}

function processUserTemplate(element) {

    var cols = [];

    // Get any col tags from the content
    var rowElement = element.querySelector("grid-row");
    var columnElements = Array.prototype.slice.call(rowElement.querySelectorAll("grid-col"));

    var expanderElement = rowElement.querySelector("grid-cols-expander"), expHash = {}, expander = null;

    if (expanderElement != null) {
        let attrs = Array.prototype.slice.call(expanderElement.attributes);
        attrs.forEach(a => expHash[a.name] = a.value);
        var expander = new GridColumnsExpander(expHash, expanderElement.innerHTML);
    }

    columnElements.forEach(c => {
        var attrs = Array.prototype.slice.call(c.attributes), colHash = {};
        attrs.forEach(a => colHash[a.name] = a.value);

        var col = new GridColumn(colHash, c.innerHTML);

        cols.push(col);
    });

    // Pull any row attrs into a hash object
    var rowAttrs = {};
    var attrs = Array.prototype.slice.call(rowElement.attributes);
    attrs.forEach(a => rowAttrs[a.name] = a.value);

    return { columns: cols, rowAttrs: rowAttrs, expander: expander };
}
