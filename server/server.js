
//Meteor.methods({


  //  'setUserId': function (userId) {
 //       this.setUserId(userId);
  //  }
//});

//CALENDAR

Meteor.methods({
    'dayClick':function (date) {
           // alert('a day has been clicked!');
        //console.log("You are getting to dayClick function");

        //var convertedDate = date.year + "-" + date.month + "-" + date.day;
        console.log(date);
        CalEvents.insert({name:'New Event', date:date});
       // CalEvents.insert({title:'Test Event', start:"2014-10-21", end:'2014-10-21'});
        //console.log("lastMod in server: " + Session.get(lastMod));

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

