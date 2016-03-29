export class GridColumn {
	template: any;
	field: any;
	heading:any;
	nosort: any;
	filterValue: any;
	showFilter: any;
	specialColumns = ["heading", "nosort"];
	hiddenCol: boolean;
	showColNameIf:string="";
	class:string="";
	
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
		this.showColNameIf = config["show-col-name-if"];
		this.class=config.class;
		// Set attributes
		for (var prop in config) {
    		if (config.hasOwnProperty(prop) && this.specialColumns.indexOf(prop) < 0) {
    			this[prop] = config[prop];
        	}
		}		
	}
}