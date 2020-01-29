"use strict";

class TableTemplate{
    static fillIn(id, dict, columnName){
        let table = document.getElementById(id);
        let header = table.rows[0];
        let rowLen = table.rows.length;
        let colLen = header.cells.length;
        let processor = new Cs142TemplateProcessor(header.innerHTML);
        header.innerHTML = processor.fillIn(dict);

        let replaceCols = [];
        if (!columnName) {
            replaceCols = Array.from(Array(colLen).keys());
        } else {
            for (let i = 0; i < colLen; ++ i) {
                if (header.cells[i].innerHTML === columnName) {
                    replaceCols = [i];
                }
            }
        }

        for(let r = 1; r < rowLen; r ++){
            let currRow = table.rows[r];
            for (let c = 0; c < replaceCols.length; c ++) {
                let currCell = currRow.cells[replaceCols[c]];
                let processor2 = new Cs142TemplateProcessor(currCell.innerHTML);
                currCell.innerHTML = processor2.fillIn(dict);

            }
        }

        table.style.visibility = "visible";
    }
}