import EndpointInput from './EndpointInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import SonarQubeMetricsInput from './SonarQubeMetricsInput';
import DisplayValueSelect from "./DisplayValueSelect";
import { DATE_FORMATS, GMT_TIMEZONES } from "../../../constants";
import TextSizeInput from "./TextSizeInput";
import MultilineTextInput from "./MultilineTextInput";
import CheckboxInput from "./CheckboxInput";

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
    component: DisplayValueSelect,
    name: 'content.timeZoneId',
    label: 'Timezone',
    dropdownItems: GMT_TIMEZONES,
    initialValue: 'Etc/GMT-2' //timezone for Poland
  },
  DateTimeFormat: {
    component: DisplayValueSelect,
    name: 'content.dateFormat',
    label: 'Date Format',
    dropdownItems: DATE_FORMATS,
    initialValue: DATE_FORMATS[3].value
  },
  Text: {
    component: MultilineTextInput,
    name: 'content.text',
    label: 'Text'
  },
  TextSize: {
    component: TextSizeInput,
    name: 'content.textSize',
    label: 'Text Size',
    dropdownItems: {
      XXL: 'h1',
      XL: 'h2',
      L: 'h3',
      M: 'h4',
      S: 'h5',
      XS: 'h6'
    },
    initialValue: 'h4'
  },
  TextOrientation: {
    component: CheckboxInput,
    name: 'content.isVertical',
    label: 'Vertical Text',
    initialValue: false
  }
};

export default dialogFields;