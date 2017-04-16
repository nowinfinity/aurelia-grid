import { transient } from 'aurelia-framework';

@transient()
export class CheckedAll {

    state: CheckBoxState[] = [];

    current: CheckBoxState;

    update: boolean = true;

    setState(filterValue: string, statusFilter: string = "", count: number, status: CheckBoxStatus = CheckBoxStatus.UnChecked) {

        this.current = this.state.filter(x => { return x.filterValue == name && x.statusFilterValue == statusFilter })[0];

        if (this.current == null) {
            this.current = new CheckBoxState(name, statusFilter, count, status);
            this.state.push(this.current);
        } else {

            if (this.update) {
                this.updateCheckBoxState(count, status);
            }
        }
    }



    updateCheckBoxState(count: number, status: CheckBoxStatus = CheckBoxStatus.UnChecked) {

        this.current.count = count;

        if (this.current.checkBoxStatus != status)
            this.current.checkBoxStatus = status;
    }
}

@transient()
export class CheckBoxState {
    filterValue: string;
    statusFilterValue: string;
    count: number;
    checkBoxStatus: CheckBoxStatus;

    constructor(filterValue: string, statusFilterValue: string, count: number, status: CheckBoxStatus) {
        this.filterValue = name;
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