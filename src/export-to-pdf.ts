import "eligrey/blob.js"
import "eligrey/FileSaver.js"
import "./rasterizeHTML"
import "./jsPDF"
import {autoinject, noView} from 'aurelia-framework';

@noView
@autoinject
export class ExportToPdf {


	static export(tableData, headers: Array<String>) {
					
		
		var htmlString = tableData.map(cols => cols.map(col => "<td>" + col + "</td>").join("")).map(row => "<tr>" + row + "</tr>").join("");

		htmlString = "<html><body><table border='1' style='width:596px;'>" + htmlString + "</table></body></html>"

		var iframe = document.createElement('iframe');
		iframe.style.width = "596px";
		iframe.style.display = "none";
		document.body.appendChild(iframe);

		iframe = iframe.contentWindow ? 
        iframe.contentWindow : 
         (
             iframe.contentDocument.document ?
             iframe.contentDocument.document : 
             iframe.contentDocument
         );
		iframe.document.open();
		iframe.document.write(htmlString);
		iframe.document.close();


		var pdf = new jsPDF('p', 'pt', 'a4');

		pdf.addHTML(iframe.document, {pagesplit: true, quality: 2}, function() {
			pdf.save('grid.pdf');
			document.body.removeChild(iframe);
		});

		//	saveAs(new Blob([file], { type: "Content-type: text/csv" }), "grid.pdf");
	}
}