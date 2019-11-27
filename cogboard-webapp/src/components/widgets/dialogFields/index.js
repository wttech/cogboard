import {
  DATE_FORMATS,
  GMT_TIMEZONES,
  TIME_FORMATS
} from '../types/WorldClockWidget/helpers';

import EndpointInput from './EndpointInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import SonarQubeMetricsInput from './SonarQubeMetricsInput';
import DisplayValueSelect from './DisplayValueSelect';
import { REQUEST_METHODS, TEXT_SIZES } from '../../../constants';
import MultilineTextInput from './MultilineTextInput';
import CheckboxInput from './CheckboxInput';
import AemHealthcheckInput from './AemHealthcheckInput';

const dialogFields = {
  EndpointField: {
    component: EndpointInput,
    name: 'endpoint',
    label: 'Endpoint',
    itemsUrl: '/api/endpoints'
  },
  SchedulePeriod: {
    component: NumberInput,
    name: 'schedulePeriod',
    label: 'Schedule Period [sec] (if 0 will run once)',
    min: 0,
    step: 10,
    initialValue: 120
  },
  Path: {
    component: TextInput,
    name: 'path',
    label: 'Path'
  },
  URL: {
    component: TextInput,
    name: 'url',
    label: 'URL'
  },
  UrlForContent: {
    component: TextInput,
    name: 'content.url',
    label: 'URL'
  },
  IdString: {
    component: TextInput,
    name: 'idString',
    label: 'ID'
  },
  IdNumber: {
    component: NumberInput,
    name: 'idNumber',
    label: 'ID',
    step: 1
  },
  Key: {
    component: TextInput,
    name: 'keyString',
    label: 'Key'
  },
  SonarQubeMetricsInput: {
    component: SonarQubeMetricsInput,
    name: 'selectedMetrics',
    initialValue: [
      'blocker_violations',
      'critical_violations',
      'major_violations',
      'minor_violations'
    ]
  },
  AemHealthcheckInput: {
    component: AemHealthcheckInput,
    name: 'selectedHealthChecks',
    initialValue: [
      'slingJobs',
      'systemchecks',
      'inactiveBundles',
      'DiskSpaceHealthCheck'
    ]
  },
  StatusCode: {
    component: NumberInput,
    name: 'expectedStatusCode',
    label: 'Expected Status Code',
    min: 0,
    step: 1,
    initialValue: 200
  },
  TimeZoneId: {
    component: DisplayValueSelect,
    name: 'content.timeZoneId',
    label: 'Timezone',
    dropdownItems: GMT_TIMEZONES,
    initialValue: GMT_TIMEZONES[0].value
  },
  DateFormat: {
    component: DisplayValueSelect,
    name: 'content.dateFormat',
    label: 'Date Format',
    dropdownItems: DATE_FORMATS,
    initialValue: DATE_FORMATS[1].value
  },
  TimeFormat: {
    component: DisplayValueSelect,
    name: 'content.timeFormat',
    label: 'Time Format',
    dropdownItems: TIME_FORMATS,
    initialValue: TIME_FORMATS[1].value
  },
  DisplayDate: {
    component: CheckboxInput,
    name: 'content.displayDate',
    label: 'Display date',
    initialValue: true
  },
  DisplayTime: {
    component: CheckboxInput,
    name: 'content.displayTime',
    label: 'Display time',
    initialValue: true
  },
  Text: {
    component: MultilineTextInput,
    name: 'content.text',
    label: 'Text'
  },
  RequestBody: {
    component: MultilineTextInput,
    name: 'body',
    label: 'Request Body'
  },
  ResponseBody: {
    component: MultilineTextInput,
    name: 'expectedResponseBody',
    label: 'Response Body Fragment'
  },
  TextSize: {
    component: DisplayValueSelect,
    name: 'content.textSize',
    label: 'Text Size',
    dropdownItems: TEXT_SIZES,
    initialValue: TEXT_SIZES[3].value
  },
  RequestMethod: {
    component: DisplayValueSelect,
    name: 'requestMethod',
    label: 'Request Method',
    dropdownItems: REQUEST_METHODS,
    initialValue: REQUEST_METHODS[0].value
  },
  TextOrientation: {
    component: CheckboxInput,
    name: 'content.isVertical',
    label: 'Vertical Text',
    initialValue: false
  }
};

export default dialogFields;
