# Logs Viewer

- `widgetLocalStorage` uses browser local storage with widget id as a key
- `searchFilter` state of searchbox highlight (not to be confused with state of searchbox input)
- `template` log template (array of column names, does not include `type` and `date`)

## Toolbar

### SearchInput

Has its own state. If input contains at least `minLetters` characters, value will be sent to higlight mechanism.

### FilterPicker

Use browser local storage.

- `filters` ui disabled when no filter is defined.
- `logLevel`
- `advanced` filters management

### DateRangePicker

Uses browser local storage and `momentjs`. Ignores seconds.

### Follow logs

_TODO_

### Clear logs

Hides all logs that have been delivered before click.
Sets begin date of `DateRangePicker` to arrival date of last log.

### Quarantine

_TODO_

## LogList

_TODO_
