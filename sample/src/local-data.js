import {inject} from 'aurelia-framework';
import {Grid} from 'aurelia-grid';

export class LocalData {
	
	
	
    constructor() {
		this.filter = "";
		var self = this;
		this.filteringSettings = {
			filterFunction(row) {
				return row.name.indexOf(self.filter) > -1;	
			}
		};
    }

	setFilter(f) {
		this.filter = f;
		this.grid.refresh();
	}	


    getLocalData(gridOptions) {	
        // Return a promise that resolves to the data
        var data = [];
        var names = ["charles", "john", "oliver", "fred", "dean", "chris", "pete", "steve", "lee", "rob", "alex", "rose", "mike", "dan", "james", "rebecca", "heather", "kate", "liam"];
		var lastNames = ["asd", "zxc", "cvb", "cvb", "vbn", "bnm", "asd", "asd", "asd", "rob", "bnm", "bnm", "bnm", "bnm", "cvb", "cvb", "cvb", "zxc", "zxc"];
		
        for (var i = 0; i < 1000; i++) {
        	var n = names[Math.floor(Math.random() * names.length)];
			var ln = lastNames[Math.floor(Math.random() * lastNames.length)];
            data.push({
                id: i,
                name: n,
				lastName: ln
            });
        };

        return new Promise((resolve, reject) => {
            resolve({
                data: data,
                count: data.length
            });
        });
    }
}
