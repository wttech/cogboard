# [Home](/cogboard/) >> AEM Bundle Info widget

#### Configuration:

- `Endpoint` - choose AEM endpoint
- `Schedule Period` - time interval between executions - recommended: `300` (5min)
- `Error threshold for 'resolved' bundles` - how many bundles with status `resolved` are needed to throw an error instead of warning
- `Error threshold for 'installed' bundles` - how many bundles with status `installed` are needed to throw an error instead of warning
- `Excluded bundles` - list of bundles to be ignored when calculating widget status; can be either display name or symbolic name.
  Excluded bundles will be put in a separate section, with option to view them all (including statuses).
