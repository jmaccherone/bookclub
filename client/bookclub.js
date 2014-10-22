
Session.setDefault('editing_calevent', null);
Session.setDefault('showEditEvent', false);
Session.setDefault('lastMod', null);


//CALENDAR

Template.calendar.showEditEvent = function(){
    return Session.get('showEditEvent');
}


//Template.editEvent.evt = function(){
//    var calEvent = CalEvents.findOne({_id:Session.get('editing_calevent')});
//    return calEvent
//}


//lastmod stuff is not working
//Template.calendar.helpers = function(){
 //   return Session.get('lastMod');
 //   console.log('lastMod: ' + lastMod);
//}

Template.calendar.rendered = function () {
    //this is the client function which calls the server function

    //Meteor.call('setUserId', userId);
    //var currentUserId = Meteor.userId();
    $('#calendar').fullCalendar({
        dayClick: function (date, allDay, jsEvent, view) {
            var clientDate = date;
            //alert('Clicked on: ' + date.format());

            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

            alert('Current view: ' + view.name);

            // change the day's background color just for fun
            $(this).css('background-color', 'red');

            console.log("You are about to call the dayClick function");
            Meteor.call('dayClick', clientDate);
            //Session.set has to happen in the template
            Session.set('lastMod', new Date());

        },



        eventClick: function (calEvent, jsEvent, view) {

        },
        events: function (start, end, callback) {
          var events = [];
          CalEvents = CalEvents.find();
          CalEvents.forEach(function (evt) {
            events.push({
              id:evt._id,
              title:evt.title,
              start:evt.start,
              end:evt.end
            });
          })
          callback(events);

        },
        editable:true
    });
}


var updateCalEvent = function (id, title) {
  CalEvents.update(id, {$set: {title:title}});
  return true;
 
}


// EMAIL - shows up in terminal
Meteor.call('sendEmail',
    'jennifer@maccherone.com',
    'bob@example.com',
    'Hello from Meteor!',
    'This is a test of Email.send.');