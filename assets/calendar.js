//LOGIC TO GENERATE CALENDAR EVENT BEHAVIOR
var today = moment(); 
var times = ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"]; 
// var url_sm = "./assets/lock_sm.png"; 
var url = "./assets/lock.png";
var manipDate = new moment().set({'hour': 8});

// var calendarRows = $('#calendarContainer').children(); 

function currentTime() {
    var currTime = setInterval(function () {
        // console.log("timer running"); 
        today = moment(); 
        $("#currentDay").text(today.format("dddd, MMMM Do YYYY, hh:mm:ss a"));
        // colorCodeCalendar(); 
    }, 1000);
  }

currentTime();

function buildCalendar() {
    //build the rows
    for(i = 0; i < times.length; i++) {
        $('#calendarContainer').append(`
            <div class="row">
            <div id="timeBox${i}" class="col-1">${manipDate.format("h a")}</div>
            <div id="eventBox${i}" class="col-10"></div>
            <div id="lockBox${i}" class="col-1"><img src='${url}'></div>
            `);
        manipDate.add(1, 'hour');
    }
}

function colorCodeCalendar() {
    var temptime = new moment().format('h a');
    var tt_num = temptime.slice(0, -3);
    var tt_ampm = temptime.slice(-2);
    
    for(i = 0; i < times.length; i++) { 
        var bt_num = $(`#timeBox${i}`).text().slice(0, -3);
        var bt_ampm = $(`#timeBox${i}`).text().slice(-2);
        bt_num = parseInt(bt_num);
        // console.log('current time: ' + tt_num + tt_ampm); 
        console.log('grid time: ' + bt_num + bt_ampm);

        //NEED TO CHANGE LOGIC - COMPARE AM/PM, THEN TIME
        if(bt_ampm == 'am') {
            //BT IS AM
            if(tt_ampm == 'am')
                // console.log('both are am'); 
                if(bt_num < tt_num)
                    console.log('BEFORE');
                else if (bt_num == tt_num)
                    console.log('EQUAL');
                else
                    console.log('AFTER');
            else if(tt_ampm == 'pm')
                // console.log('bt is am but tt is pm'); 
                console.log('BEFORE');
            else
                console.log('error');
        }
        //BT IS PM
        else {
            if(tt_ampm == 'am') 
                {
                // console.log('bt is pm but tt is am'); 
                console.log('AFTER');
                }
            else if(tt_ampm == 'pm') 
            {

                // console.log('both are pm'); 
                if(bt_num == '12') 
                {
                    if(tt_num == '12')
                        console.log('EQUAL');
                    else
                        console.log('BEFORE');
                }
          
                if(bt_num < tt_num)
                    console.log('BEFORE');
                else if (bt_num == tt_num)
                    console.log('EQUAL');
                else {
                    if(bt_num != '12')
                    console.log('AFTER');
                }
            }
        } //is pm
    }
}



buildCalendar();
colorCodeCalendar();

