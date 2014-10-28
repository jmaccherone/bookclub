events =
  recurringEvents: [
    {_id: 'AAA', bookClubID: '111', startOn: '2014-01-01', endBefore: null, type: 'monthly', dayOfWeek: 'Thursday', occurrenceInMonth: 2}  # Second Thursday of every month
    {_id: 'BBB', bookClubID: '222', startOn: '2014-10-01', endBefore: null, type: 'monthly', dayOfWeek: 'Tuesday', occurrenceInMonth: 3}  # Third Tuesday of every month
    {_id: 'CCC', bookClubID: '333', startOn: '2014-10-01', endBefore: null, type: 'weekly', dayOfWeek: 'Monday'}  # Every Monday
  ]
  oneTimeEvents: [
    {_id: 'DDD', recurringEventID: null, bookClubID: '111', on: '2014-10-12', name: 'Halloween party', book: null, chapters: null, notes: ''}
    {_id: 'EEE', recurringEventID: 'BBB', on: '2014-10-21', name: '', book: 'Moby Dick', chapters: null, notes: 'Please come prepared'}
  ]

