//DECLARE GLOBAL VARIABLES
//-----------------------------------------------------------------------//
var today = moment(); 
var times = ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"]; 
// var url_sm = "./assets/lock_sm.png"; 
var url = "./assets/lock.png";
var manipDate = new moment().set({'hour': 8});


//DECLARE FUNCTIONS
//-----------------------------------------------------------------------//

//SET UP CURRENT DATE & TIMER EVENT/CLOCK
function currentTime() {
    var currTime = setInterval(function () {
        // console.log("timer running"); 
        today = moment(); 
        $("#currentDay").text(today.format("dddd, MMMM Do YYYY, hh:mm:ss a"));
        // colorCodeCalendar(); 
    }, 1000);
  }

currentTime();

//-----------------------------------------------------------------------//
//Build calendar framework
function buildCalendar() {
    //build the rows
    for(i = 0; i < times.length; i++) {
        $('#calendarContainer').append(`
            <div id="row${i}" class="row">
            <div id="timeBox${i}" class="col-2">${manipDate.format("h a")}</div>
            <div id="eventBox${i}" class="col-9"></div>
            <div id="lockBox${i}" class="col-1"><img src='${url}'></div>
            `);
        manipDate.add(1, 'hour');
    }
}

//color code calendar according to time of day
function colorCodeCalendar() {
    // var temptime = new moment().set('hour',6).format('h a'); for testing
    var temptime = new moment().format('h a');
    var tt_num = temptime.slice(0, -3);
    var tt_ampm = temptime.slice(-2);
    
    for(i = 0; i < times.length; i++) { 
        var bt_num = $(`#timeBox${i}`).text().slice(0, -3);
        var bt_ampm = $(`#timeBox${i}`).text().slice(-2);
        bt_num = parseInt(bt_num);

        //NEED TO CHANGE LOGIC - COMPARE AM/PM, THEN TIME
        if(bt_ampm == 'am') {
            //BT IS AM
            if(tt_ampm == 'am')
                if(bt_num < tt_num)
                    $(`#row${i}`).addClass('past');
                else if (bt_num == tt_num)
                    $(`#row${i}`).addClass('present');
                else
                    $(`#row${i}`).addClass('future');
            else if(tt_ampm == 'pm')
                $(`#row${i}`).addClass('past');
            else
                console.log('error');
        }
        //BT IS PM
        else {
            if(tt_ampm == 'am') 
                {
                $(`#row${i}`).addClass('future');
                }
            else
            //both are pm 
            {
                if(bt_num == '12') 
                {
                    if(tt_num == '12')
                        $(`#row${i}`).addClass('present');
                    else
                        $(`#row${i}`).addClass('past');
                }
                else 
                {
                if(bt_num < tt_num)
                     $(`#row${i}`).addClass('past');
                else if (bt_num == tt_num)
                    $(`#row${i}`).addClass('present');
                else {
                    if(bt_num != '12')
                    $(`#row${i}`).addClass('future');
                    }
                }
            }
        } 
    }
}


//ADD EVENT LISTENERS
//-----------------------------------------------------------------------//

//Listen for click on an event box
$(document).on('click', '.col-9', function () {
    var userEvent = prompt("Please enter the event/task details below:");
    this.innerHTML = userEvent;
});

var elog = JSON.parse(localStorage.getItem("elog")) || [];
// console.log(elog); 

$(document).on('click', '.col-1', function () {
    var tempIndex = this.id.slice(-1);
    var tempEvent = {
        event: $(`#eventBox${tempIndex}`).text(),
        location: `${tempIndex}`
    };
    console.log(tempEvent); 
    elog.push(tempEvent);
    localStorage.setItem("elog", JSON.stringify(elog)); 
});

//BUILD WEBPAGE/CALL FUNCTIONS
//-----------------------------------------------------------------------//
buildCalendar();
colorCodeCalendar();

