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

### LogParserStrategy
Interface for building new parsers of logs received from the server. 
#### Fields
- `variableFields: List<String>`

Stores list of fields that are parsed out of log line, different from required fields of `date` and `type`

#### Methods
- `parseLine(line: String): Log`

Transforms line from log file to instance of `Log` class. This method should capture data for mandatory fields:
`date` and `type`, but also for fields stored in `variableFields` list.

### LogParserStrategyFactory
Factory class used to create instances of classes implementing `LogParserStrategy`
#### Inner class
- `enum class Type`

Used to distinguish what type of parser should be created. When implementing new parser, new entry should be
added to this enumerator.

#### Methods
- `build(typeStr: String): LogParserStrategy`

Creates instance of parser, based on the passed `typeStr`. Passed parameter value should match name of any entry
in `Type` enumerator. If value doesn't match, `UnknownParserTypeException` is thrown.

### ConnectionStrategy
Abstract class used to connect to the server and retrieve new lines of logs or number of lines in remote log file.
By using references to this class, rest of the application doesn't have to know what method is used for 
obtaining the data.

#### Methods
- `authenticationTypes(): Set<Any>`

Method should return types of authentication that can be used by this strategy. Values returned should be entries
of enum classes such as `AuthenticationType` from package `com.cognifide.cogboard.http.auth`

- `getNumberOfLines(): Long?`

Implementations should fetch information from remote server about amount of lines in monitored log file.

- `getLogs(skipFirstLines: Long?): Collection<String>`

Implementations should download logs from monitored file, optionally skipping given number of first lines e.g.
if log file has 200 lines and `skipFirstLines` is set to 50, only lines 51 to 200 should be downloaded.

### SSHConnectionStrategy
Implementation of `ConnectionStrategy` class. Uses SSH protocol to connect to server.
#### Overriden methods
- `authenticationTypes(): Set<Any>`

This strategy allows two types of authentication: 

`BASIC` - username + password

`SSH_KEY` - username + private SSH key

- `getNumberOfLines(): Long?`

Bash command `wc` is executed on the server by instance of `SSHClient` class

- `getLogs(skipFirstLines: Long?): Collection<String>`

Bash command `tail` or `cat` is executed on the server by `SSHClient` instance, depending on whether non-null 
value was passed in parameter `skipFirstLines`.

#### Other methods
- `prepareConfig(config: JsonObject): JsonObject`

Ensures that required fields are added to `config` JsonObject. Calls `prepareConfigLines` method.

- `prepareConfigLines(config: JsonObject, vararg fields: String): JsonObject`

Iterates over values passed as `fields` and checks if field of that name is present in `config` object - if not
then it's taken from `endpoint.loaded` field, which stores info about remote that widget connects to.

### ConnectionStrategyFactory
Factory class that creates needed `ConnectionStrategy` implementation based on `address` passed in constructor.

#### Methods
- `build(): ConnectionStrategy`

Returns created `ConnectionStrategy` implementation which is created based on `scheme` from instance of `URI`
class created by passing `address` to its static `create` method. Upon adding support for new protocol of 
communication, value of `scheme` for that protocol should be added to this method's `when` expression