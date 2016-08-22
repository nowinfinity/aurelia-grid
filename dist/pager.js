System.register(['aurelia-framework', 'aurelia-templating-resources'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_framework_1, aurelia_templating_resources_1;
    var Pager;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_templating_resources_1_1) {
                aurelia_templating_resources_1 = aurelia_templating_resources_1_1;
            }],
        execute: function() {
            Pager = (function () {
                function Pager(signaler) {
                    // Max num pages to show
                    this.numToShow = 10;
                    // Disable/enable
                    this.nextDisabled = false;
                    this.prevDisabled = false;
                    // Pager button options
                    this.showFirstLastButtons = true;
                    this.showJumpButtons = true;
                    this.hideJumpButtonsIfNotPossible = true;
                    this.firstVisibleItem = 0;
                    this.lastVisibleItem = 0;
                    this.count = 0;
                    // Total number of items in the dataset
                    this.page = 1;
                    this.pageCount = 0;
                    this.pages = [];
                    this.signaler = signaler;
                }
                Pager.prototype.attached = function () {
                    if (this.page != 0 && this.pageSize != 0 && this.count != 0)
                        this.update(this.page, this.pageSize, this.count);
                };
                Object.defineProperty(Pager.prototype, "showJumpPrev", {
                    get: function () {
                        if (this.pages.length == 0)
                            return false;
                        return this.showJumpButtons && !(this.pages[0].index == '1' && this.hideJumpButtonsIfNotPossible);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pager.prototype, "showJumpNext", {
                    get: function () {
                        if (this.pages.length == 0)
                            return false;
                        return this.showJumpButtons && !(this.pages[this.pages.length - 1].index == this.pageCount && this.hideJumpButtonsIfNotPossible);
                    },
                    enumerable: true,
                    configurable: true
                });
                Pager.prototype.changePage = function (page) {
                    var oldPage = this.page;
                    this.page = this.cap(page);
                    if (oldPage !== this.page) {
                        this.onPageChanged(this.page);
                    }
                };
                // Called when the data source changes
                Pager.prototype.update = function (page, pagesize, totalItems) {
                    this.page = page;
                    this.totalItems = totalItems;
                    this.pSize = pagesize;
                    this.createPages();
                };
                Pager.prototype.cap = function (page) {
                    if (page < 1)
                        return 1;
                    if (page > this.pageCount)
                        return this.pageCount;
                    return page;
                };
                Pager.prototype.createPages = function () {
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
                    if (firstPageNumber < 1)
                        firstPageNumber = 1;
                    // Add the number of pages to render
                    // remember to subtract 1 as this represents the first page number
                    var lastPageNumber = firstPageNumber + numToRender - 1;
                    // If the last page is greater than the page count
                    // add the difference to the first/last page
                    if (lastPageNumber > this.pageCount) {
                        var dif = this.pageCount - lastPageNumber;
                        firstPageNumber += dif;
                        lastPageNumber += dif;
                    }
                    var pages = [];
                    for (var i = firstPageNumber; i <= lastPageNumber; i++) {
                        pages.push({ index: i, class: this.page == i ? "active" : "" });
                    }
                    ;
                    this.pages = pages;
                    this.updateButtons();
                    this.signaler.signal('refresh-pagination-signal');
                };
                Pager.prototype.updateButtons = function () {
                    this.nextDisabled = this.page === this.pageCount;
                    this.prevDisabled = this.page === 1;
                };
                Pager.prototype.next = function () {
                    this.changePage(this.page + 1);
                };
                Pager.prototype.nextJump = function () {
                    this.changePage(this.page + this.numToShow);
                };
                Pager.prototype.prev = function () {
                    this.changePage(this.page - 1);
                };
                Pager.prototype.prevJump = function () {
                    this.changePage(this.page - this.numToShow);
                };
                Pager.prototype.first = function () {
                    this.changePage(1);
                };
                Pager.prototype.last = function () {
                    this.changePage(this.pageCount);
                };
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay, defaultValue: 10 }), 
                    __metadata('design:type', Object)
                ], Pager.prototype, "pageSize", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "onPageChanged", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "numToShow", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "showFirstLastButtons", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "showJumpButtons", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "hideJumpButtonsIfNotPossible", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "showPagingSummary", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "showPageSizeBox", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "firstVisibleItem", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "lastVisibleItem", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "pageSizes", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "count", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "page", void 0);
                __decorate([
                    aurelia_framework_1.bindable, 
                    __metadata('design:type', Object)
                ], Pager.prototype, "pages", void 0);
                Pager = __decorate([
                    aurelia_framework_1.customElement('pager'),
                    aurelia_framework_1.inject(aurelia_templating_resources_1.BindingSignaler), 
                    __metadata('design:paramtypes', [Object])
                ], Pager);
                return Pager;
            }());
            exports_1("Pager", Pager);
        }
    }
});
