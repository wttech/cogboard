import EndpointInput from './EndpointInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import SonarQubeMetricsInput from './SonarQubeMetricsInput';
import DateFormatSelect from "./DateFormatSelect";
import AutoSuggestSelect from "./AutoSuggestSelect";
import {DATE_FORMATS} from "../../../constants";
import moment from 'moment-timezone';

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
    label: 'Schedule Period [seconds]',
    min: 1,
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
    initialValue: ['blocker_violations', 'critical_violations', 'major_violations', 'minor_violations']
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
    component: AutoSuggestSelect,
    name: 'content.timeZoneId',
    label: 'Timezone',
    options: moment.tz.names(),
    placeholder: 'Search...'
  },
  DateTimeFormat: {
    component: DateFormatSelect,
    name: 'content.dateFormat',
    label: 'Date Format',
    dropdownItems: DATE_FORMATS,
    initialValue: DATE_FORMATS[3].value
  },
};

export default dialogFields;