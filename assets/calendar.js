//LOGIC TO GENERATE CALENDAR EVENT BEHAVIOR
// var today = moment();
var times = [8,9,10,11,12,1,2,3,4,5]; 

function currentTime() {
    var currTime = setInterval(function () {
        // console.log("timer running"); 
        var today = moment(); 
        $("#currentDay").text(today.format("dddd, MMMM Do YYYY, hh:mm:ss a"));
    }, 1000);
  }

currentTime();

function buildCalendar() {
    //build the rows
    for(i = 0; i < times.length; i++) {
        var tempCont = document.getElementById("calendarContainer");
        var tempDiv = document.createElement("div");
        tempCont.appendChild(tempDiv).classList.add("row");
        tempCont.classList.add("row");
    }
    //add the columns
    var allRows = document.getElementById("calendarContainer").children;

    $.each(allRows, function(){
       var tDiv1 = document.createElement("div");
       this.appendChild(tDiv1).classList.add("col-1");
       var tDiv2 = document.createElement("div");
       this.appendChild(tDiv2).classList.add("col-10");
       var tDiv3 = document.createElement("div");
       this.appendChild(tDiv3).classList.add("col-1");
      });
}


buildCalendar();
