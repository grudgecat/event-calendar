//DECLARE GLOBAL VARIABLES
//-----------------------------------------------------------------------//
var today = moment(); 
var numTimeSlots = 10;
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
//set clock/time of day
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

//add any stored events to calendar
function addEvents() {
    //fill current events stored in local storage
    if(eList.length > 0){
        // console.log(eList); 
        var rowNum = 0;
        var eventData = 0;

        for(i = 0; i < eList.length; i++) {
            rowNum = eList[i].location;
            eventData = eList[i].event;
            //match saved location and current rows before writing data
            for(j=0; j < numTimeSlots; j++) {
                if(j == rowNum) {
                    $(`#eventBox${j}`).text(eventData);  

                }
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

//if Clear Calendar button is clicked, clear events in calendar and local storage, reload page.
function clearMemory() {
    localStorage.clear();
    for(i = 0; i < numTimeSlots; i++) {
        $(`#eventBox${i}`).text("");  
    }
    setTimeout(function(){ location.reload(); }, 500); 
    return "";
}

//ADD EVENT LISTENERS
//-----------------------------------------------------------------------//

//Listen for click on an event box, prompt user for event & add to page.
$(document).on('click', '.col-9', function () {
    var userEvent = prompt("Please enter the event/task details below:");
    this.innerHTML = userEvent;
});

//Listen for click on 'save icon', save event data to localStorage.
$(document).on('click', '.col-1', function () {
    var tempIndex = this.id.slice(-1);
    var tempEvent = {
        event: $(`#eventBox${tempIndex}`).text(),
        location: `${tempIndex}`
    };
    eList
    .push(tempEvent);
    localStorage.setItem("eList", JSON.stringify(eList));
    alert("Event data saved."); 
});

//BUILD WEBPAGE/CALL FUNCTIONS
//-----------------------------------------------------------------------//
buildCalendar();
colorCodeCalendar();
addEvents();
