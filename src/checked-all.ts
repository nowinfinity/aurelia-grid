import { transient } from 'aurelia-framework';

@transient()
export class CheckedAll {

    state: CheckBoxState[] = [];

    current: CheckBoxState;

    update: boolean = true;

    setState(filterValue: string, statusFilter: string = "", count: number, status: CheckBoxStatus = CheckBoxStatus.UnChecked) {

        this.current = this.state.filter(x => { return x.filterValue == filterValue && x.statusFilterValue == statusFilter })[0];

        if (this.current == null) {
            this.current = new CheckBoxState(filterValue, statusFilter, count, status);
            this.state.push(this.current);
        }
        else {
           // this.current.checkBoxStatus = status,
            this.current.count = count;
        }
    }
}

@transient()
export class CheckBoxState {
    filterValue: string;
    statusFilterValue: string;
    count: number;
    checkBoxStatus: CheckBoxStatus;

    constructor(filterValue: string, statusFilterValue: string, count: number, status: CheckBoxStatus) {
        this.filterValue = filterValue;
        this.statusFilterValue = statusFilterValue;
        this.checkBoxStatus = status;
        this.count = count;
    }
}

export enum CheckBoxStatus {
    UnChecked,
    Checked,
    NotAllChacked
}