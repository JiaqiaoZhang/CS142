"use strict";

// constructor,  args: @id : attribute for an existing div
// @ callback: date selection callback function
function DatePicker(id, callback){
    this.id = id;
    this.callback = callback;

    // create calender and add it to div
    this.render = function (newDate) {

        var element = document.getElementById(this.id);
        console.log(this.id);
        if(element === null){
            console.log("element is null");
        }
        element.appendChild(this.createCalender(newDate));

    };

    // header:  "<  Janurary  > "
    this.createHeader = function(table, date) {
        let header = table.createTHead();
        let row = header.insertRow(0);

        let leftCell = row.insertCell(0);
        leftCell.innerHTML = "<";
        leftCell.setAttribute("id", "LeftCell");

        let monthCell = row.insertCell(1);
        let months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        monthCell.innerHTML = months[date.getMonth()] + "      " + date.getFullYear();
        monthCell.colSpan = "5";

        let rightCell = row.insertCell(2);
        rightCell.innerHTML = ">";
        rightCell.setAttribute("id", "RightCell");

        // go to previous month
        leftCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() - 1);
            this.render(date);
        });

        // go to next month
        rightCell.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() + 1);
            this.render(date);
        });

        return header;
    };

    this.createCalender = function(date){
        // create a table
        let table = document.createElement("table");

        // create table header
        let header = this.createHeader(table, date);

        // add days of week
        let week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        let weekRow = header.insertRow(1);
        for(let i = 0; i < 7; i++){
            let weekCell = weekRow.insertCell(i);
            weekCell.innerHTML = week[i];
        }

        // set days in calendar
        let monthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let currDate = new Date(monthFirstDay.getTime());
        currDate.setDate(-monthFirstDay.getDay() + 1);  // always start with Sunday
        let rowIdx = 2;
        while(true){
            let dateRow = table.insertRow(rowIdx);
            rowIdx += 1;
            for(let i = 0; i < 7; i++){
                let dateCell = dateRow.insertCell(i);
                dateCell.innerHTML = currDate.getDate();
                if (currDate.getMonth() === date.getMonth()) {
                    dateCell.setAttribute("id", "CurMonth");
                    let fixedDate = {
                        month: currDate.getMonth() + 1,
                        day: dateCell.innerHTML,
                        year: currDate.getFullYear()
                    };
                    // select date to call the callback function
                    dateCell.addEventListener("click", () => {
                        this.callback(this.id, fixedDate);
                    });
                } else {
                    dateCell.setAttribute("id", "OtherMonth");
                }
                currDate.setDate(currDate.getDate() + 1);

            }
            if(currDate.getMonth() !== date.getMonth()){
                break;
            }
        }
        return table;
    };

}





