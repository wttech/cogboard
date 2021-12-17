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

### Follow logs

_TODO_

### Clear logs

Hides all logs that have been delivered before usage.
Sets begin date of `DateRangePicker` to arrival date of last log.

### Quarantine

_TODO_

## LogList

Displays logs and column names.
Will not render if logs are not provided (template required).

### VariableGridSchema

Component which provides equal columns widths for `Header` and `LogEntry`.

- `getGridTemplate` - by default column gets `1fr` of space, but `message` column will receive `3fr`. Returns `grid-template-columns`.

### Logs

Virtuoso is used to virtualize list.

### Highlighting

There is double check for highlight - one for marker in the left-upper corner (`isLogHighlighted`), second used in `LogEntry` for text highlighting (`highlightText`).

### Following logs

_TODO_

### LogEntry

Every log column consists of `header` (accordion summary) and `description` (accordion details).
