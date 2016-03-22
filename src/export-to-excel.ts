import "eligrey/blob.js"
import "eligrey/FileSaver.js"
import {GridColumn} from "./grid-column"
import "xlsx"
import {autoinject, noView, ViewCompiler, ViewSlot, Container, ViewResources} from 'aurelia-framework';

@noView
@autoinject
export class ExportToExcel {

	columns: GridColumn[];

	constructor(private viewCompiler: ViewCompiler, private viewSlot: ViewSlot, private container: Container, private resources: ViewResources, columns: Array<GridColumn>) {
		this.columns = columns;
	}

	export(data) {

		var test = data.map(d => {
			return this.columns.map(c => {
				var view = this.viewCompiler.compile("<template>" + c.template.replace('${ $', '${').replace('${$', '${') + "</template>", this.resources).create(this.container);
				view.bind({item: d});
				return view.fragment.childNodes[1].textContent;
			});
		})

		 /* original data */
		 var ws_name = "SheetJS";
		 var wb = new Workbook(), ws = this.sheet_from_array_of_arrays(test);

		 /* add worksheet to workbook */
		 wb.SheetNames.push(ws_name);
		 wb.Sheets[ws_name] = ws;
		 var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
		 saveAs(new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }), "test.xlsx");
	}

	datenum(v, date1904) {
		if (date1904) v += 1462;
		var epoch = Date.parse(v);
		return (epoch - new Date(Date.UTC(1899, 11, 30)).valueOf()) / (24 * 60 * 60 * 1000);
	}

	sheet_from_array_of_arrays(data) {
		var ws = {};
		var C = 0;

		for (var R = 0; R != data.length; ++R) {
			C = 0;
			for (var property in data[R]) {
				if (data[R].hasOwnProperty(property)) {
					var cell = { v: data[R][property], c: null, t: null, z: null };
					if (cell.v == null) continue;
					var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

					if (typeof cell.v === 'number') cell.t = 'n';
					else if (typeof cell.v === 'boolean') cell.t = 'b';
					else if (cell.v instanceof Date) {
						cell.t = 'n'; cell.z = XLSX.SSF._table[14];
						cell.v = this.datenum(cell.v, false);
					}
					else cell.t = 's';

					ws[cell_ref] = cell;
					C = C + 1;
				}
			}
		}
		ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: data.length, c: C - 1 } });
		return ws;
	}

	s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
}

export class Workbook {
	SheetNames: any = [];
	Sheets: any = {};
}