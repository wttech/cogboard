# [Home](/cogboard/) >> Service Check widget

#### Configuration:

- `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
- `Request Method` - choose request method >> `GET | PUT | POST | DELETE`
- `Endpoint` - choose service endpoint
- `Path` - service url >> example: `/login`
- `Request Body` - Required field for `PUT` and `POST` requests (format: `json`) >> example: `{ "user": "test", "password": "test" }`
- `Expected Status Code` - status code that is expected for this service >> default: `200`
- `Response body` - response body that is expected for this service
