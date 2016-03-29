export class GridColumnsExpander{

	template: any;
	
	viewModel:string;

	 model:any;
	 
	constructor(config, template){
		this.template = template;
		this.viewModel = config.template;
		this.model = config.model;
	}
			
}