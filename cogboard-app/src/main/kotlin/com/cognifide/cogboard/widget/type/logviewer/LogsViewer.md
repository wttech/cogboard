# Logs Viewer widget

## Classes
### LogViewerWidget
Main widget class, inheriting from BasicWidget.

#### Constructor
An eventBus listener is created that handles sending logs upon launching widget by the user.
#### Non-inherited methods
- `updateWidget(fetchNewLogs: boolean)`

Request logs from LogStorage is address was provided in widget configuration. 
New logs should be fetched by LogStorage if `fetchNewLogs` is set to true

- `sendResponse(logs: JsonObject)`

Sends quarantine rules to front-end.

- `buildConfiguration(config: JsonObject): LogStorageConfiguration`

Transforms widget configuration `JsonObject` to `LogStorageConfiguration` by passing chosen fields 
from config.

- `determineConnectionStrategy(): ConnectionStrategy?`

Uses `ConnectionStrategyFactory` to get correct strategy that will be used to connect 
with endpoint providing logs.

- `determineLogParsingStrategy()`

Uses `LogParsingStrategyFactory` to get proper parser for logs, based on `LOG_PARSER` field from
configuration of the widget.

### LogStorage
Class managing connection with database - it fetches logs from it and updates with new logs 
delivered by `ConnectionStrategy` passed in constructor.

#### Fields
- `enabledRegexes: List<Regex>`

Returns regexes of quarantine rules that are enabled at the moment.

- `logsCollection: MongoCollection<Document>`

gets collection of logs associated to this widget from mongoDB

- `collectionState: LogCollectionState?`

Returns a logs collection configuration associated with this widget (if present).

#### Methods
- `saveState(state: LogCollectionState?)`

Saves new state of widget or deletes it from database if no state is passed as argument

- `deleteAllLogs()`

Deletes all logs from collection associated with given widget.

- `deleteFirstLogs(n: Long)`

Deletes given number of logs starting from lowest `seq` value in collection. 
Used to keep configured number of logs in the database

- `deleteOldLogs()`

Deletes logs that have been in the database for longer than the configured validity time.

- `deleteSpaceConsumingLogs()`

Computes how many logs have to be deleted to keep collection size under configured max value.
Then uses `deleteFirstLogs` method to get rid of them.

- `filter(logs: MutableList<Log>)`

Deletes logs meeting the quarantine criteria from list of newly downloaded entries.

- `filterExistingLogs()`

Deletes entries from collection that meet the quarantine criteria.

- `downloadFilterLogs(skipFirstLines: Long? = null): List<Log>`

Downloads new logs from remote server, skipping number of lines passed as a parameter - in our use case it is
the number of the last downloaded line in the previous connection to the remote. Received logs are also 
filtered using `filter` method.

- `insertLogs(seq: Long, logs: Collection<Log>)`

Used to save received `logs` to collection associated with current widget instance.

`seq` is used to index logs in database in order of their appearance in remote log file.

- `downloadLogs(): List<Log>`

Checks collection state for number of last line downloaded and last `seq` value assigned. 
Then logs are downloaded using `downloadFilterLogs` method and added to database by calling `insertLogs`.

- `prepareResponse(insertedLogs: List<Log>): JsonObject`

Prepares logs for sending them to frontend and adds `variableFields` from parser to give frontend information
how to display the logs according to how they were parsed.

- `updateLogs(fetchNewLogs: Boolean)`

Downloads new logs if `fetchNewLogs` is set to `true` and sends data returned by `prepareResponse` method to frontend

- `delete()`

Deletes all data associated with used widget instance.