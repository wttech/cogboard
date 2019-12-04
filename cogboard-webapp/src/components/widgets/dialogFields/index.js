import { string, number, boolean, array, ref } from 'yup';

import {
  DATE_FORMATS,
  GMT_TIMEZONES,
  TIME_FORMATS
} from '../types/WorldClockWidget/helpers';
import { parseWidgetTypes, transformMinValueToHalf } from './helpers';
import {
  REQUEST_METHODS,
  TEXT_SIZES,
  validationMessages as vm
} from '../../../constants';
import { uniqueFieldTestCreator } from '../../validation';
import widgetTypes from '../../widgets';

import EndpointInput from './EndpointInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import SonarQubeMetricsInput from './SonarQubeMetricsInput';
import DisplayValueSelect from './DisplayValueSelect';
import MultilineTextInput from './MultilineTextInput';
import CheckboxInput from './CheckboxInput';
import AemHealthcheckInput from './AemHealthcheckInput';
import conditionallyHidden from './conditionallyHidden';
import SwitchInput from './SwitchInput';
import { StyledNumberInput } from './styled';
import CredentialInput from './Credentialnput';
import PasswordInput from './PasswordInput';

const dialogFields = {
  LabelField: {
    component: TextInput,
    name: 'label',
    label: 'Label',
    initialValue: 'Label',
    validator: ({ max, labelId, labels }) =>
      string()
        .trim()
        .max(max, vm.STRING_LENGTH('Label', max))
        .test(uniqueFieldTestCreator(labelId, labels, data => data.label))
        .required(vm.FIELD_REQUIRED())
  },
  CredentialField: {
    component: CredentialInput,
    name: 'credentials',
    label: 'Credential',
    validator: () => string().required(vm.FIELD_REQUIRED())
  },
  UsernameField: {
    component: TextInput,
    name: 'user',
    label: 'Username',
    validator: ({ max }) =>
      string()
        .trim()
        .max(max, vm.STRING_LENGTH('Label', max))
        .required(vm.FIELD_REQUIRED())
  },
  PasswordField: {
    component: PasswordInput,
    name: 'password',
    label: 'Password',
    validator: () => string().required(vm.FIELD_REQUIRED)
  },
  PasswordConfirmationField: {
    component: PasswordInput,
    name: 'passwordConfirmation',
    label: 'Password confirmation',
    validator: () => string().oneOf([ref('password'), null], vm.PASSWORD_MATCH)
  },
  PublicURL: {
    component: TextInput,
    name: 'publicUrl',
    label: 'Public URL',
    validator: () => string().url(vm.INVALID_URL())
  },
  WidgetTypeField: {
    component: DisplayValueSelect,
    name: 'type',
    label: 'Type',
    dropdownItems: parseWidgetTypes(widgetTypes),
    validator: () => string().required(vm.FIELD_REQUIRED())
  },
  TitleField: {
    component: TextInput,
    name: 'title',
    label: 'Title',
    initialValue: 'Title',
    validator: ({ max }) =>
      string()
        .trim()
        .max(max, vm.STRING_LENGTH('Title', max))
  },
  UniqueTitleField: {
    component: TextInput,
    name: 'title',
    label: 'Title',
    initialValue: 'Title',
    validator: ({ max, boardId, boards }) =>
      string()
        .trim()
        .max(max, vm.STRING_LENGTH('Title', max))
        .test(uniqueFieldTestCreator(boardId, boards, data => data.title))
        .required(vm.FIELD_REQUIRED())
  },
  ColumnField: {
    component: NumberInput,
    name: 'columns',
    label: 'Columns',
    initialValue: 1,
    validator: ({ min, max }) =>
      number()
        .min(min, vm.NUMBER_MIN('Columns', min))
        .max(max, vm.NUMBER_MAX('Columns', max))
        .required(vm.FIELD_REQUIRED())
  },
  ColumnFieldSm: {
    component: StyledNumberInput,
    name: 'columns',
    label: 'Columns',
    initialValue: 1,
    valueUpdater: transformMinValueToHalf(),
    validator: ({ min, max }) =>
      number()
        .min(min, vm.NUMBER_MIN('Columns', min))
        .max(max, vm.NUMBER_MAX('Columns', max))
        .required(vm.FIELD_REQUIRED())
  },
  RowFieldSm: {
    component: StyledNumberInput,
    name: 'rows',
    label: 'Rows',
    initialValue: 1,
    valueUpdater: transformMinValueToHalf(),
    validator: ({ min, max }) =>
      number()
        .min(min, vm.NUMBER_MIN('Rows', min))
        .max(max, vm.NUMBER_MAX('Rows', max))
        .required(vm.FIELD_REQUIRED())
  },
  NewLineField: {
    component: SwitchInput,
    name: 'goNewLine',
    label: 'Go to new line',
    checkboxValue: 'goNewLine',
    validator: () => boolean()
  },
  DisabledField: {
    component: SwitchInput,
    name: 'disabled',
    label: 'Disabled',
    checkboxValue: 'disabled',
    validator: () => boolean()
  },
  AutoSwitchField: {
    component: SwitchInput,
    name: 'autoSwitch',
    label: 'Auto Switch',
    checkboxValue: 'autoSwitch',
    validator: () => boolean()
  },
  SwitchInterval: {
    component: conditionallyHidden(NumberInput, 'autoSwitch', value => value),
    name: 'switchInterval',
    label: 'Switch Interval [sec]',
    validator: ({ min }) =>
      number().when('autoSwitch', {
        is: true,
        then: number()
          .min(min, vm.NUMBER_MIN('Switch interval', min))
          .required(),
        otherwise: number().notRequired()
      })
  },
  EndpointField: {
    component: EndpointInput,
    name: 'endpoint',
    label: 'Endpoint',
    validator: () => string()
  },
  SchedulePeriod: {
    component: NumberInput,
    name: 'schedulePeriod',
    label: 'Schedule Period [sec] (if 0 will run once)',
    min: 0,
    step: 10,
    initialValue: 120,
    validator: ({ min }) =>
      number().min(min, vm.NUMBER_MIN('Schedule period', min))
  },
  Path: {
    component: TextInput,
    name: 'path',
    label: 'Path',
    validator: () => string()
  },
  URL: {
    component: TextInput,
    name: 'url',
    label: 'URL',
    validator: () => string().url(vm.INVALID_URL())
  },
  IFrameURL: {
    component: TextInput,
    name: 'iframeUrl',
    label: 'URL',
    validator: () => string().url(vm.INVALID_URL())
  },
  IdString: {
    component: TextInput,
    name: 'idString',
    label: 'ID',
    validator: () => string()
  },
  IdNumber: {
    component: NumberInput,
    name: 'idNumber',
    label: 'ID',
    step: 1,
    validator: () => number()
  },
  Key: {
    component: TextInput,
    name: 'keyString',
    label: 'Key',
    validator: () => string()
  },
  SonarQubeMetricsInput: {
    component: SonarQubeMetricsInput,
    name: 'selectedMetrics',
    initialValue: [
      'blocker_violations',
      'critical_violations',
      'major_violations',
      'minor_violations'
    ],
    validator: ({ minArrayLength = 0 }) =>
      array()
        .ensure()
        .min(minArrayLength, vm.FIELD_MIN_ITEMS())
        .of(string())
  },
  AemHealthcheckInput: {
    component: AemHealthcheckInput,
    name: 'selectedHealthChecks',
    initialValue: [
      'slingJobs',
      'systemchecks',
      'inactiveBundles',
      'DiskSpaceHealthCheck'
    ],
    validator: ({ minArrayLength = 0 }) =>
      array()
        .ensure()
        .min(minArrayLength, vm.FIELD_MIN_ITEMS())
        .of(string())
  },
  StatusCode: {
    component: NumberInput,
    name: 'expectedStatusCode',
    label: 'Expected Status Code',
    min: 0,
    step: 1,
    initialValue: 200,
    validator: () =>
      number()
        .lessThan(600)
        .moreThan(99)
        .required(vm.FIELD_REQUIRED())
  },
  TimeZoneId: {
    component: DisplayValueSelect,
    name: 'timeZoneId',
    label: 'Timezone',
    dropdownItems: GMT_TIMEZONES,
    initialValue: GMT_TIMEZONES[0].value,
    validator: () => string()
  },
  DateFormat: {
    component: DisplayValueSelect,
    name: 'dateFormat',
    label: 'Date Format',
    dropdownItems: DATE_FORMATS,
    initialValue: DATE_FORMATS[1].value,
    validator: () => string()
  },
  TimeFormat: {
    component: DisplayValueSelect,
    name: 'timeFormat',
    label: 'Time Format',
    dropdownItems: TIME_FORMATS,
    initialValue: TIME_FORMATS[1].value,
    validator: () => string()
  },
  DisplayDate: {
    component: CheckboxInput,
    name: 'displayDate',
    label: 'Display date',
    initialValue: true,
    validator: () => boolean()
  },
  DisplayTime: {
    component: CheckboxInput,
    name: 'displayTime',
    label: 'Display time',
    initialValue: true,
    validator: () => boolean()
  },
  Text: {
    component: MultilineTextInput,
    name: 'text',
    label: 'Text',
    validator: () => string()
  },
  RequestBody: {
    component: MultilineTextInput,
    name: 'body',
    label: 'Request Body (Json format or empty)',
    validator: () => string()
  },
  ResponseBody: {
    component: MultilineTextInput,
    name: 'expectedResponseBody',
    label: 'Response Body Fragment',
    validator: () => string()
  },
  TextSize: {
    component: DisplayValueSelect,
    name: 'textSize',
    label: 'Text Size',
    dropdownItems: TEXT_SIZES,
    initialValue: TEXT_SIZES[3].value,
    validator: () => string()
  },
  RequestMethod: {
    component: DisplayValueSelect,
    name: 'requestMethod',
    label: 'Request Method',
    dropdownItems: REQUEST_METHODS,
    initialValue: REQUEST_METHODS[0].value,
    validator: () => string()
  },
  TextOrientation: {
    component: CheckboxInput,
    name: 'isVertical',
    label: 'Vertical Text',
    initialValue: false,
    validator: () => boolean()
  }
};

export default dialogFields;
