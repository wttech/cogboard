import { string, number, boolean, array } from 'yup';

const INVALID_URL = 'Invalid URL';
const FIELD_REQUIRED = 'This field is required';
const FIELD_MIN_ITEMS = 'This field must have at least 1 item.'

export const dialogFieldsValidators = {
  EndpointField: {
    name: 'endpoint',
    validator: string().required(FIELD_REQUIRED)
  },
  SchedulePeriod: {
    name: 'schedulePeriod',
    validator: number().min(1).required(FIELD_REQUIRED)
  },
  Path: {
    name: 'path',
    validator: string().required(FIELD_REQUIRED)
  },
  URL: {
    name: 'url',
    validator: string().url(INVALID_URL).required(FIELD_REQUIRED)
  },
  UrlForContent: {
    name: 'content.url',
    validator: string().url(INVALID_URL).required(FIELD_REQUIRED)
  },
  IdString: {
    name: 'idString',
    validator: string().required(FIELD_REQUIRED)
  },
  IdNumber: {
    name: 'idNumber',
    validator: number().required(FIELD_REQUIRED)
  },
  Key: {
    name: 'keyString',
    validator: string().required(FIELD_REQUIRED)
  },
  SonarQubeMetricsInput: {
    name: 'selectedMetrics',
    validator: array().ensure().min(1, FIELD_MIN_ITEMS).of(string()) 
  },
  AemHealthcheckInput: {
    name: 'selectedHealthChecks',
    validator: array().ensure().min(1, FIELD_MIN_ITEMS).of(string())
  },
  StatusCode: {
    name: 'expectedStatusCode',
    validator: number().lessThan(600).moreThan(99).required(FIELD_REQUIRED)
  },
  TimeZoneId: {
    name: 'content.timeZoneId',
    validator: string().required(FIELD_REQUIRED)
  },
  DateFormat: {
    name: 'content.dateFormat',
    validator: string().required(FIELD_REQUIRED)
  },
  TimeFormat: {
    name: 'content.timeFormat',
    validator: string().required(FIELD_REQUIRED)
  },
  DisplayDate: {
    name: 'content.displayDate',
    validator: boolean().required(FIELD_REQUIRED)
  },
  DisplayTime: {
    name: 'content.displayTime',
    validator: boolean().required(FIELD_REQUIRED)
  },
  DateTimeSize: {
    name: 'content.textSize',
    validator: string().matches(/(h2|h3|h4|h5|h6|subtitle1|subtitle2)/).required(FIELD_REQUIRED)
  },
  Text: {
    name: 'content.text',
    validator: string().required()
  },
  TextSize: {
    name: 'content.textSize',
    validator: string().matches(/(h1|h2|h3|h4|h5|h6)/).required(FIELD_REQUIRED)
  },
  TextOrientation: {
    name: 'content.isVertical',
    validator: boolean().required()
  }
  };