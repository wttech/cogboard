# Logs Viewer

- `widgetLocalStorage` \* uses browser local storage with widget id as a key
- `searchFilter` - state of searchbox highlight (not to be confused with state of searchbox input)
- `template` - log template (array of column names, does not include `type` and `date`)

## Toolbar

### SearchInput

Has its own state. If input contains at least `minLetters` characters, value will be sent to higlight mechanism.

### FilterPicker

Uses local storage of the browser.

- `filters`
  - ui disabled when no filter is defined.
- `logLevel`
- `advanced` - filters management

### DateRangePicker

Uses local storage of the browser and `momentjs` library. Ignores seconds.

Dates (begin and end) are held in state as `momentjs` objects. Each time value changes, it is saved as `string` in browser local storage. When it is loaded from local storage(eg. Logs Viewer reload) it is converted back to `momentjs` object.

Log dates are strings.

### Clear logs

Hides all logs that have been delivered before usage.
Sets begin date of `DateRangePicker` to arrival date of last log.

## LogList

Displays logs and column names.
Will not render if logs are not provided (template required).

Loglist flow is straight forward untill count of logs meets maximum number of logs. Then new logs are pushing old ones upward and you have to manually compensate to prevent screen shaking. Component remembers last:

- `prevScrollPos` - previous scroll position
- `prevLastLogId` - previous last log on the list
- `prevLogsLength` - previous logs length

### On logs change:

It finds where is lastLog after adding new logs (offset).
It subtracts new logs count from offset because
Offset != newLogsCount.
Depending on filters, there might be less logs after adding new logs - old logs mathed filter, new ones don't).
Then it updates last log id (it won't update logsCount, because this function will call onScroll and it needs old logsCount value).

### On scroll:

- `scrollerOffset` < 0

  it moved upward

- `scrollerOffset` < `logHeight` \* `logsCountOffset`

  it moved more than moving from 'on logs change' could

### VariableGridSchema

Component which provides equal columns widths for `Header` and `LogEntry`.

- `getGridTemplate` - by default column gets `1fr` of space, but `message` column will receive `3fr`. Returns `grid-template-columns`.

### Logs

Virtuoso is used to virtualize the list.

### Highlighting

There is double check for highlight - one for marker in the left-upper corner (`isLogHighlighted`), second used in `LogEntry` for text highlighting (`highlightText`).

### Following logs

Virtuoso handles scrolling. It is triggered only when logs.length changes. When log limit isn't met it works, when it is it doesn't need to work. There is manual scroll to the last log on following start.

### LogEntry

Every log column consists of `header` (accordion summary) and `description` (accordion details).
