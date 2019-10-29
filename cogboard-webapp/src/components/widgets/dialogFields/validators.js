import { string, number, boolean, array } from 'yup';

export const dialogFieldsValidators = {
  EndpointField: {
    name: 'endpoint',
    validator: string().required()
  },
  SchedulePeriod: {
    name: 'schedulePeriod',
    validator: number().min(1).required()
  },
  Path: {
    name: 'path',
    validator: string().required()
  },
  URL: {
    name: 'url',
    validator: string().required()
  },
  UrlForContent: {
    name: 'content.url',
    validator: string().required()
  },
  IdString: {
    name: 'idString',
    validator: string().required()
  },
  IdNumber: {
    name: 'idNumber',
    validator: number().required()
  },
  Key: {
    name: 'keyString',
    validator: string().required()
  },
  SonarQubeMetricsInput: {
    name: 'selectedMetrics',
    validator: array().ensure().of(string()) 
  },
  AemHealthcheckInput: {
    name: 'selectedHealthChecks',
    validator: array().ensure().min(1).of(string())
  },
  StatusCode: {
    name: 'expectedStatusCode',
    validator: number().min(1).required()
  },
  TimeZoneId: {
    name: 'content.timeZoneId',
    validator: string().required()
  },
  DateFormat: {
    name: 'content.dateFormat',
    validator: string().required()
  },
  TimeFormat: {
    name: 'content.timeFormat',
    validator: string().required()
  },
  DisplayDate: {
    name: 'content.displayDate',
    validator: boolean().required()
  },
  DisplayTime: {
    name: 'content.displayTime',
    validator: boolean().required()
  },
  DateTimeSize: {
    name: 'content.textSize',
    validator: string().matches(/(h2|h3|h4|h5|h6|subtitle1|subtitle2)/).required()
  },
  Text: {
    name: 'content.text',
    validator: string().required()
  },
  TextSize: {
    name: 'content.textSize',
    validator: string().matches(/(h1|h2|h3|h4|h5|h6)/).required()
  },
  TextOrientation: {
    name: 'content.isVertical',
    validator: boolean()
  }
  };