//CALENDAR

CalEvents = new Meteor.Collection('calevents');

//for cleanup
//CalEvents.remove({title:'New Event'});

//test insertion
CalEvents.insert({title:'New Event', start:'2014-10-14', end:'2014-10-14'});