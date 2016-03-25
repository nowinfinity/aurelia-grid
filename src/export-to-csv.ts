import "eligrey/blob.js"
import "eligrey/FileSaver.js"
import {GridColumn} from "./grid-column"
import "xlsx"
import {autoinject, noView} from 'aurelia-framework';

@noView
@autoinject
export class ExportToCsv {


	static export(tableData, headers: Array<String>) {
		
		var file = headers.join(',') + "\n" +
					tableData.map(cols => cols.join(",")).join("\n");
		
		saveAs(new Blob([file], { type: "Content-type: text/csv" }), "grid.csv");
	}
}