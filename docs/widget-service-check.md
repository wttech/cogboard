# [Home](/cogboard/) >> Service Check widget

#### Configuration:

- `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
- `Request Method` - choose request method >> `GET | PUT | POST | DELETE`
- `Endpoint` - choose service endpoint
- `Path` - service url >> example: `/login`
- `Request Body` - Optional field for `PUT` and `POST` requests (empty or in Json format >> example: `{ "user": "test", "password": "test" }`)
- `Response body fragment` - response body fragment that is expected for this service
- `Expected Status Code` - status code that is expected for this service >> default: `200`

#### Presentation

Widget displays:

- Expected status code. If response status code is different it shows: ex. "200 EXPECTED, GOT 404"
- Response status:
  - `MATCH` - response includes expected response fragment
  - `NOT MATCH` - response not includes expected reponse fragment
  - `OK` - when expected response body remains empty
- Response body message - in a popover after hover a mouse over reponse status
