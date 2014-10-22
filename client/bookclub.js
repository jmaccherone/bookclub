
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

Template.calendar.helpers = function(){
    return Session.get('lastMod');
}

Template.calendar.rendered = function () {
    //this is the client function which calls the server function
    $('#calendar').fullCalendar({
        dayClick: function () {
            //Meteor.call('setUserId', userId);
            //var currentUserId = Meteor.userId();
            console.log("You are about to call the dayClick function");
            Meteor.call('dayClick');

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