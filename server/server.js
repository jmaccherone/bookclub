
//Meteor.methods({


  //  'setUserId': function (userId) {
 //       this.setUserId(userId);
  //  }
//});

//CALENDAR

Meteor.methods({
    'dayClick':function () {
           // alert('a day has been clicked!');
        console.log("You are getting to dayClick function");
        CalEvents.insert({title:'New Event', start:'2014-10-15', end:'2014-10-15'});
          //  CalEvents.insert({title: "New Event", start:date, end:date});
        //Session.set('lastMod', new Date());
        }
    });

// EMAIL
Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});

