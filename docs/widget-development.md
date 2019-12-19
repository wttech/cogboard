# [Home](/cogboard/) >> Widget Development

## Frontend

### Add new widget file

All available widgets are listed in `cogboard-webapp/src/components/widgets/types`. Create new file or copy any existing widget. Remember to keep filename convention - WidgetNameWidget.js. Widget is a React functional component which consume props from the backend server.

**The very basic structure of the widget component looks as follows:**

```javascript
import React from "react";

import Typography from "@material-ui/core/Typography";

const MyWidget = () => {
  return (
    <Typography color="textSecondary" variant="subtitle2">
      Default content
    </Typography>
  );
};

export default MyWidget;
```

### Update `index`

Also you must update `cogboard-webapp/src/components/widgets/index.js` and register your new widget.

### Create custom dialog fields (optional)

`// TODO`

---

## Backend (optional)

When widget doesn't do anything on backed and just displays fields given in configuration then backend part is not required.

### Add new Widget Class

All available widgets are listed in `com.cognifide.cogboard.widget.type` package. Create new Kotlin class for new widget. Remember to keep filename convention - WidgetNameWidget.kt. Widget should extend `BaseWidget` or `AsyncWidget`. Use `AsyncWidget` when widget is communicating with 3rd party data source, `BaseWidget` otherwise.

Example:

```kotlin
class JenkinsJobWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val url: String = config.endpointProp("url")

    // this method will be executed for once or in schedule
    override fun updateState() {
        httpGet(url = "$url/api/json") // send request for JSON to 3rd party
    }

    // handleResponse(...) is executed when httpGet or httpPost finishes and gets data
    override fun handleResponse(responseBody: JsonObject) {
        responseBody.getJsonObject("data")?.let {
            val status = Widget.Status.from(it.getString("result"))

            // at the end use send(...) to notify front-end that widget status has changed
            send(JsonObject()
                    .put(CogboardConstants.PROP_STATUS, status) // new status for widget
                    .put(CogboardConstants.PROP_CONTENT, it)) // new content for widget
        }
    }
}
```

### Upddate `WidgetIndex`

Also you must update `com.cognifide.cogboard.widget.WidgetIndex` and register your new widget.
