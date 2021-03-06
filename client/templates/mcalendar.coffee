{Time} = require('./tzTime')

# !TODO: Remove once we upgrade to latest tzTime
MONTH_TO_S_MAP = {1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'}

Template.mcalendar.events(
  'click #today': () ->
    today = new Date()
    month = today.getMonth() + 1
    year = today.getFullYear()
    thisMonth = new Time("#{year}-#{month}")
    selectedMonth = thisMonth
    Session.set('selectedMonth', selectedMonth)

  'click #previousMonth': () ->
    selectedMonth = Session.get('selectedMonth')
    selectedMonth = new Time(selectedMonth)
    selectedMonth.decrement(Time.MONTH)
    Session.set('selectedMonth', selectedMonth)

  'click #nextMonth': () ->
    selectedMonth = Session.get('selectedMonth')
    selectedMonth = new Time(selectedMonth)
    selectedMonth.increment(Time.MONTH)
    Session.set('selectedMonth', selectedMonth)
)

Template.mcalendar.helpers(
  selectedMonthString: () ->
    selectedMonth = Session.get('selectedMonth')
    if selectedMonth?
      selectedMonth = new Time(selectedMonth)
    else
      today = new Date()
      month = today.getMonth() + 1
      year = today.getFullYear()
      thisMonth = new Time("#{year}-#{month}")
      selectedMonth = thisMonth
      Session.set('selectedMonth', selectedMonth)

    monthString = MONTH_TO_S_MAP[selectedMonth.month]  # !TODO: use Time.monthString() after upgrading tzTime
    return "#{monthString} #{selectedMonth.year}"

  weeksInMonth: () ->
    selectedMonth = Session.get('selectedMonth')
    selectedMonth.granularity = Time.DAY
    firstDayOfMonth = new Time(selectedMonth)
    currentDay = new Time(firstDayOfMonth)
    dowNumber = firstDayOfMonth.dowNumber()
    if dowNumber is 7
      dowNumber = 0
      output = []
    else
      week = []
      week[dowNumber] = firstDayOfMonth
      for i in [dowNumber - 1..0]
        currentDay = currentDay.add(-1)
        currentDay.notCurrentMonth = 'notCurrentMonth'
        week[i] = currentDay
      currentDay = new Time(firstDayOfMonth)
      if dowNumber < 6
        for i in [dowNumber + 1..6]
          currentDay = currentDay.add(1)
          week[i] = currentDay
      output = [{week}]
      currentDay = currentDay.add(1)
    while (currentDay.month is selectedMonth.month)
      week = []
      for i in [0..6]
        unless currentDay.month is selectedMonth.month
          currentDay.notCurrentMonth = 'notCurrentMonth'
        week[i] = currentDay
        currentDay = currentDay.add(1)
      output.push({week})
    return output

)

Template.day.helpers(
  id: () ->
    return this.toString()

  currentDay: () ->
    today = new Date()
    day = today.getDate()
    month = today.getMonth() + 1
    year = today.getFullYear()
    if this.day is day and this.month is month and this.year is year
      return 'current-day'
    else
      return null

  events: () ->
#    console.log('Code for retrieving events goes here', this)  # Note: this contains the current date as a tzTime.Time object
  # if there is an event in CalEvents on this date, show CalEvents.name and Calevents.startTime
  #  CalEvents.findOne(name='New Event')

  #  CalEvents.forEach: () ->
  #    events.push
  #      id:evt._id
  #      name:evt.name
  #      start:evt.start
  #      end:evt.end
#    events = CalEvents.find().fetch()
    dayString = this.toString()
    oneTimeEvents = OneTimeEvents.find({on: dayString}).fetch()
    output = []
    for e in oneTimeEvents
      row = {name: e.name, time: "#{e.startTime}-#{e.endTime}"}
      if e.recurringEventID?
        recurringEvent = RecurringEvents.findOne(e.recurringEventID)
        row.time = "#{recurringEvent.startTime}-#{recurringEvent.endTime}"
        bookClub = BookClubs.findOne(recurringEvent.bookClubID)
      else
        bookClub = BookClubs.findOne(e.bookClubID)

      if (not row.name?) or row.name is ''
        row.name = bookClub.name
      output.push(row)
    return output
)

Template.day.events(
  'click #new-event': () ->
    console.log('New event code goes here.', this)  # Note: this contains the current date as a tzTime.Time object
    Meteor.call('dayClick', this)
)