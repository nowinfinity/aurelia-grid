import "./blob";
import "./fileSaver";
import {autoinject, noView} from 'aurelia-framework';

@noView
@autoinject
export class ExportToCsv {

	
	
	static export(tableData, headers: Array<String>, name) {
		var file = "sep=,\n" + headers.join(',') + "\n" +
					tableData.map(cols => cols.join(",")).join("\n"); 
		saveAs(new Blob([file], { type: "Content-type: text/csv; charset=UTF-8" }), name+".csv");
	}
}