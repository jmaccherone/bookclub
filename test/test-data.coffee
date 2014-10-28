this.testData =
  RecurringEvents: [
    {_id: 'AAA', bookClubID: '111', startOn: '2014-01-01', endBefore: null, type: 'monthly', dayOfWeek: 'Thursday', occurrenceInMonth: 2, startTime: '18:30:00.000', endTime: '21:15:00.000'}  # Second Thursday of every month
    {_id: 'BBB', bookClubID: '222', startOn: '2014-10-01', endBefore: null, type: 'monthly', dayOfWeek: 'Tuesday', occurrenceInMonth: 3, startTime: '18:00:00.000', endTime: '20:00:00.000'}  # Third Tuesday of every month
    {_id: 'CCC', bookClubID: '333', startOn: '2014-10-01', endBefore: null, type: 'weekly', dayOfWeek: 'Monday'}  # Every Monday
  ]
  OneTimeEvents: [
    {_id: 'DDD', recurringEventID: null, bookClubID: '111', on: '2014-10-12', name: 'Halloween party', book: null, chapters: null, notes: '', startTime: '20:00:00.000', endTime: '23:00:00.000'}
    {_id: 'EEE', recurringEventID: 'BBB', on: '2014-10-21', name: '', book: 'Moby Dick', chapters: null, notes: 'Please come prepared'}
  ]
  BookClubs: [
    {_id: '111', name: 'Neighborhood bookclub'}
    {_id: '222', name: 'Church bookclub'}
  ]

