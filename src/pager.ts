import {bindable, customElement, bindingMode, inject } from 'aurelia-framework';
import {BindingSignaler} from 'aurelia-templating-resources';

@customElement('pager')
@inject(BindingSignaler)
export class Pager {
	
	
	constructor(signaler) {
		this.signaler = signaler;
		
	}
	
	attached(){
		if (this.page != 0 && this.pageSize != 0 && this.count != 0)
			this.update(this.page, this.pageSize, this.count);
	}
	
	signaler: any;
	
	totalItems: any;
	pSize: number;
	@bindable({defaultBindingMode: bindingMode.twoWay, defaultValue: 10}) pageSize;
	// Called when the selected page changes
	@bindable onPageChanged;

	// Max num pages to show
	@bindable numToShow = 10;

	// Disable/enable
	nextDisabled = false;
	prevDisabled = false;

	// Pager button options
	@bindable showFirstLastButtons = true;
	@bindable showJumpButtons = true;
	@bindable hideJumpButtonsIfNotPossible = true;
	
	@bindable showPagingSummary;
	@bindable showPageSizeBox;
	
	@bindable firstVisibleItem = 0;
	@bindable lastVisibleItem = 0;
	@bindable pageSizes;
	@bindable count = 0;

	// Total number of items in the dataset
	@bindable page = 1;
	pageCount = 0;

	@bindable pages = [];

	get showJumpPrev() {
		if (this.pages.length == 0)
			return false;
		
		return this.showJumpButtons && !(this.pages[0].index == '1' && this.hideJumpButtonsIfNotPossible);
	}
	
	get showJumpNext() {
		if (this.pages.length == 0)
			return false;
			
		return this.showJumpButtons && !(this.pages[this.pages.length - 1].index == this.pageCount && this.hideJumpButtonsIfNotPossible);
	}

	changePage(page) {

		var oldPage = this.page;

	    this.page = this.cap(page);

	    if (oldPage !== this.page) {
	        this.onPageChanged(this.page);
	    }
	}
	
	// Called when the data source changes
	update(page, pagesize, totalItems) {
		this.page = page;
		this.totalItems = totalItems;
		this.pSize = pagesize;
		
		this.createPages();
	}

	cap(page) {
		if(page < 1) return 1;
		if(page > this.pageCount) return this.pageCount;

		return page;
	}

	createPages() {

		// Calc the max page number
		this.pageCount = Math.ceil(this.totalItems / this.pSize);

		// Cap the number of pages to render if the count is less than number to show at once
		var numToRender = this.pageCount < this.numToShow ? this.pageCount : this.numToShow;

		// The current page should try to appear in the middle, so get the median 
		// of the number of pages to show at once - this will be our adjustment factor
		var indicatorPosition = Math.ceil(numToRender / 2);

		// Subtract the pos from the current page to get the first page no
		var firstPageNumber = this.page - indicatorPosition + 1;

		// If the first page is less than 1, make it 1
		if(firstPageNumber < 1)
			firstPageNumber = 1;

		// Add the number of pages to render
		// remember to subtract 1 as this represents the first page number
		var lastPageNumber = firstPageNumber + numToRender - 1;

		// If the last page is greater than the page count
		// add the difference to the first/last page
		if(lastPageNumber > this.pageCount){
			var dif = this.pageCount - lastPageNumber;

			firstPageNumber += dif;
			lastPageNumber += dif;
		}

		var pages = [];

		for (var i = firstPageNumber; i <= lastPageNumber; i++) {
			pages.push({index : i, class: this.page == i ? "active" : "" });
		};

		this.pages = pages;
		this.updateButtons();
		
		this.signaler.signal('refresh-pagination-signal');
	}

	updateButtons() {
		this.nextDisabled = this.page === this.pageCount;		
		this.prevDisabled = this.page === 1;
	}

	next() {
		this.changePage(this.page + 1);
	}

	nextJump() {
		this.changePage(this.page + this.numToShow);
	}

	prev() {
		this.changePage(this.page - 1);
	}

	prevJump() {
		this.changePage(this.page - this.numToShow);
	}
	
	first() {
		this.changePage(1);
	}
	
	last() {
		this.changePage(this.pageCount);
	}

	
}