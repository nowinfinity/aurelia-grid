System.register(['aurelia-framework'], function(exports_1, context_1) {
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
    var aurelia_framework_1;
    var CheckedAll, CheckBoxState, CheckBoxStatus;
    return {
        setters:[
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }],
        execute: function() {
            CheckedAll = (function () {
                function CheckedAll() {
                    this.state = [];
                    this.update = true;
                }
                CheckedAll.prototype.setState = function (filterValue, statusFilter, count, status) {
                    if (statusFilter === void 0) { statusFilter = ""; }
                    if (status === void 0) { status = CheckBoxStatus.UnChecked; }
                    this.current = this.state.filter(function (x) { return x.filterValue == filterValue && x.statusFilterValue == statusFilter; })[0];
                    if (this.current == null) {
                        this.current = new CheckBoxState(filterValue, statusFilter, count, status);
                        this.state.push(this.current);
                    }
                    else {
                        // this.current.checkBoxStatus = status,
                        this.current.count = count;
                    }
                };
                CheckedAll = __decorate([
                    aurelia_framework_1.transient(), 
                    __metadata('design:paramtypes', [])
                ], CheckedAll);
                return CheckedAll;
            }());
            exports_1("CheckedAll", CheckedAll);
            CheckBoxState = (function () {
                function CheckBoxState(filterValue, statusFilterValue, count, status) {
                    this.filterValue = filterValue;
                    this.statusFilterValue = statusFilterValue;
                    this.checkBoxStatus = status;
                    this.count = count;
                }
                CheckBoxState = __decorate([
                    aurelia_framework_1.transient(), 
                    __metadata('design:paramtypes', [String, String, Number, Number])
                ], CheckBoxState);
                return CheckBoxState;
            }());
            exports_1("CheckBoxState", CheckBoxState);
            (function (CheckBoxStatus) {
                CheckBoxStatus[CheckBoxStatus["UnChecked"] = 0] = "UnChecked";
                CheckBoxStatus[CheckBoxStatus["Checked"] = 1] = "Checked";
                CheckBoxStatus[CheckBoxStatus["NotAllChacked"] = 2] = "NotAllChacked";
            })(CheckBoxStatus || (CheckBoxStatus = {}));
            exports_1("CheckBoxStatus", CheckBoxStatus);
        }
    }
});
