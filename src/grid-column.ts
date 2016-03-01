export class GridColumn {
	template: any;
	field: any;
	heading:any;
	nosort: any;
	filterValue: any;
	showFilter: any;
	specialColumns = ["heading", "nosort"];
	hiddenCol: boolean;

	constructor(config, template) {
		this.template = template;
		this.field = config.field;

		if(!this.field)
			throw new Error("field is required");

		this.heading = config.heading || config.field;
		this.nosort = config.nosort || false;
		this.filterValue = "";
		this.showFilter = config["show-filter"] === "false" ? false : true;
		this.hiddenCol = config["hidden-col"] === "true" ? true : false;
		
		// Set attributes
		for (var prop in config) {
    		if (config.hasOwnProperty(prop) && this.specialColumns.indexOf(prop) < 0) {
    			this[prop] = config[prop];
        	}
		}		
	}
}