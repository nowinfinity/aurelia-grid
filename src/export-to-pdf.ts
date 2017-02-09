import "./rasterizeHTML"
import "./jsPdf"
import {autoinject, noView} from 'aurelia-framework';

@noView
@autoinject
export class ExportToPdf {


	static export(tableData, headers: Array<String>, name) {
					
		console.info(headers);
		var htmlHeaders = "<tr>" + headers.map(cols => "<td style='text-align:center; font-weight: bold; min-width: 100px;'>" + cols + "</td>").join("")  + "</tr>";
		
		var htmlString = tableData.map(cols => cols.map(col => "<td>" + col + "</td>").join("")).map(row => "<tr style='text-align:center;'>" + row + "</tr>").join("");

		htmlString = "<html><style>body{font-family:'Times New Roman', Times, serif;font-style:normal;font-size:12px;font-variant: small-caps;text-decoration:none;}table{border-collapse:collapse;}table,th,td{border:1px solid black;}</style><body><div style='width:596px;'><table border='1'>" + htmlHeaders + htmlString + "</table></div></body></html>"

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


		var pdf = new jsPDF({
			orientation: 'landscape',
			unit: 'in',
			format: 'a4'
		});

		pdf.setFont('times')
		pdf.setFontSize(14);

		pdf.addHTML(iframe.document, {pagesplit: true, quality: 5}, function() {
			pdf.save(name+'.pdf');
			document.body.removeChild(iframe);
		});

		//	saveAs(new Blob([file], { type: "Content-type: text/csv" }), "grid.pdf");
	}
}