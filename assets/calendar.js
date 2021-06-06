//LOGIC TO GENERATE CALENDAR EVENT BEHAVIOR
var today = moment(); 
var times = ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"]; 
var manipDate = new moment().set({'hour': 8});


function currentTime() {
    var currTime = setInterval(function () {
        // console.log("timer running"); 
        today = moment(); 
        $("#currentDay").text(today.format("dddd, MMMM Do YYYY, hh:mm:ss a"));
    }, 1000);
  }

currentTime();

function buildCalendar() {
    var url = "./assets/lock_sm.png";
    //build the rows
    for(i = 0; i < times.length; i++) {
        $('#calendarContainer').append(`
            <div class="row">
            <div class="col-1">${manipDate.format("h a")}</div>
            <div class="col-10">info here</div>
            <div class="col-1"><img src='${url}'></div>
            `);
        manipDate.add(1, 'hour');
    }
}
buildCalendar();

