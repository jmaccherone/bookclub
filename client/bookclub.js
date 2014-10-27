
Session.setDefault('editing_calevent', null);
Session.setDefault('showEditEvent', false);
Session.setDefault('lastMod', null);

Tracker.autorun(function () {
    Meteor.subscribe("CalEvents", 'lastMod');
});

Meteor.subscribe("CalEvents");
Meteor.subscribe("lastMod");


//CALENDAR

Template.calendar.showEditEvent = function(){
    return Session.get('showEditEvent');
}


Template.editEvent.evt = function(){
   var calEvent = CalEvents.findOne({_id:Session.get('editing_calevent')});
   return calEvent
}



Template.calendar.lastMod = function(){
   return Session.get('lastMod');
 //  console.log('lastMod: ' + lastMod);
}

Template.editEvent.events({
    'click .save':function(evt,tmpl){
        updateCalEvent(Session.get('editing_calevent'),tmpl.find('.title').value);
        Session.set('editing_event',null);
        Session.set('showEditEvent',false);
        Session.set('lastMod',new Date());
    }
})


//Template.calendar.helpers({
//    lastMod: function() {
    //rendered: function?
//    return Session.get('lastMod');
//    }
//});

Template.calendar.rendered = function () {
    //this is the client function which calls the server function

    //Meteor.call('setUserId', userId);
    //var currentUserId = Meteor.userId();
    $('#calendar').fullCalendar({
        dayClick: function (date, allDay, jsEvent, view) {
            //why all these parameters when only date is used??
            var clientDate = date;
            //  alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            //alert('Current view: ' + view.name);

            // change the day's background color just for fun
            //$(this).css('background-color', 'red');

            console.log("You are about to call the dayClick function");
            Meteor.call('dayClick', clientDate);
            //Session.set has to happen in the template
            //console.log('newDate: ' + new Date());
            Meteor.setTimeout(function (){
                Session.set('lastMod', new Date());
            }, 1000)


       //     console.log('lastMod in client:' + Session.get('lastMod'));
        },



        eventClick: function (calEvent, jsEvent, view) {
            Session.set('editing_calevent',calEvent.id);
            Session.set('showEditEvent',true);
        },

        eventDrop:function(calEvent){
            CalEvents.update(calEvent.id, {$set: {start:calEvent.start,end:calEvent.end}});
            Session.set('lastMod',new Date());
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
            })
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