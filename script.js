// Initialize the date and hour variables that will be used
var currentDate = dayjs().format('dddd, MMMM D');
var currentHour = parseInt(dayjs().format('H'));

$(function () {

    // Sets each event's text to the matching local storage item
    for (var i = 9; i <= 17; i++) {
        $('#hour-' + i).children('textarea').val(localStorage.getItem('hour-' + i));
    }

    // Following code creates the click function for each save button
    // When clicked the function saves the matching user input to local storage
    $('.saveBtn').click(function() {
        var eventEl = $(this).parent();
        var userInput = eventEl.children('textarea').val();
        var eventId = eventEl.attr('id');
        localStorage.setItem(eventId, userInput);
    });

    // Calls the checkTime() method for each event.
    for (var i = 9; i <= 17; i++) {
        checkTime(i);
    }

    // Displays the current date at the top of the page
    $('.date').text(currentDate);

    // Adds click event to the clear schedule button which clears the 
    // local storage and schedule
    $('#clear-btn').click(function() {
        // localStorage.clear();
        for (var i = 9; i <= 17; i++) {
            localStorage.removeItem('hour-' + i);
            $('#hour-' + i).children('textarea').val('');
        }
    })

    // Checks the current time of the given event, compares it to the current hour,
    // and sets class to past, present, or future accordingly.
    function checkTime(givenHour) {

        var eventEl = $("#hour-" + givenHour);
        var eventHourText = $(eventEl).text();
        var eventHour = parseInt(eventHourText);

        if (eventHour < 9) {
            eventHour += 12;
        }
    
        if (eventHour > currentHour) {
            eventEl.addClass('future');
        } else if (eventHour < currentHour) {
            eventEl.addClass('past');
        } else {
            eventEl.addClass('present');
        }
    
        return;
    }
  });