CalEvents = new Meteor.Collection('calevents');
Session.setDefault('editing_calevent', null);
Session.setDefault('showEditEvent', false);

//
//Router.map(function () {
//    this.route('homepage', {path: '/'});
//});
//
//Router.map(function () {
//    this.route('calendar', {path: '/calendar'});
//});

Template.calendar.rendered = function () {
    $('#calendar').fullCalendar({
        dayClick: function (date, allDay, jsEvent, view) {

        },
        eventClick: function (calEvent, jsEvent, view) {

        },
        events: function (start, end, callback) {

        }
    });
}

