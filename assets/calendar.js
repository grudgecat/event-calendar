//DECLARE GLOBAL VARIABLES
//-----------------------------------------------------------------------//
var today = moment(); 
var times = ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"]; 
var numTimeSlots = 10;
// var url_sm = "./assets/lock_sm.png"; 
var url = "./assets/lock.png";
var manipDate = new moment().set({'hour': 8});

var eList = JSON.parse(localStorage.getItem("eList")) || [];


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
    for(i = 0; i < numTimeSlots; i++) {
        $('#calendarContainer').append(`
            <div id="row${i}" class="row">
            <div id="timeBox${i}" class="col-2">${manipDate.format("h a")}</div>
            <div id="eventBox${i}" class="col-9"></div>
            <div id="lockBox${i}" class="col-1"><img src='${url}'></div>
            `);
        manipDate.add(1, 'hour');
    }
}

//fill current events stored in local storage
if(eList.length > 0){
    // console.log(eList); 
    var rowNum = 0;
    var eventData = 0;

    for(i = 0; i < eList.length; i++) {
        rowNum = eList[i].location;
        eventData = eList[i].event;
        console.log(rowNum);
        console.log(eventData);

        for(j=0; j < numTimeSlots; j++) {
            if(j == rowNum) {
                // console.log("row " + j + "match for row location " + rowNum + " gets " + eventData); 
                //DESIRED BEHAVIOR: to put `eventData` into `eventBox[j]`
                //SAMPLE OF WHAT EXPECTED TO WORK BUT DIDN'T
                // $(`#eventBox${j}`).innerHTML = eventData; 
                // var tempEl = document.getElementById("eventBox0"); 
                // console.log(tempEl);  returns NULL 
                // tempEl.innerHTML = eventData; 
                
            }
        }
    }
}

//color code calendar according to time of day
function colorCodeCalendar() {
    // var temptime = new moment().set('hour',6).format('h a'); for testing
    var temptime = new moment().format('h a');
    var tt_num = temptime.slice(0, -3);
    var tt_ampm = temptime.slice(-2);
    
    for(i = 0; i < numTimeSlots; i++) { 
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

function clearMemory() {
    localStorage.clear();
    return "";
}

//ADD EVENT LISTENERS
//-----------------------------------------------------------------------//

//Listen for click on an event box
$(document).on('click', '.col-9', function () {
    var userEvent = prompt("Please enter the event/task details below:");
    this.innerHTML = userEvent;
});


$(document).on('click', '.col-1', function () {
    var tempIndex = this.id.slice(-1);
    var tempEvent = {
        event: $(`#eventBox${tempIndex}`).text(),
        location: `${tempIndex}`
    };
    eList
.push(tempEvent);
    localStorage.setItem("eList", JSON.stringify(eList)); 
});

//BUILD WEBPAGE/CALL FUNCTIONS
//-----------------------------------------------------------------------//
buildCalendar();
colorCodeCalendar();

