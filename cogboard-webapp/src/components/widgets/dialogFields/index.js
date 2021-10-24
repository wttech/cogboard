import { string, number, boolean, array, ref } from 'yup';

import {
  DATE_FORMATS,
  GMT_TIMEZONES,
  TIME_FORMATS
} from '../types/WorldClockWidget/helpers';
import { parseTypes, transformMinValue } from './helpers';
import {
  REQUEST_METHODS,
  TEXT_SIZES,
  validationMessages as vm,
  SONARQUBE_VERSIONS,
  ZABBIX_METRICS,
  CONTENT_TYPE
} from '../../../constants';
import { uniqueFieldTestCreator } from '../../validation';
import boardTypes from '../../boards';

import EndpointInput from './EndpointInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import SonarQubeMetricsInput from './SonarQubeMetricsInput';
import DisplayValueSelect from './DisplayValueSelect';
import MultilineTextInput from './MultilineTextInput';
import CheckboxInput from './CheckboxInput';
import AemHealthcheckInput from './AemHealthcheckInput';
import ConditionallyHidden from './ConditionallyHidden';
import SwitchInput from './SwitchInput';
import { StyledNumberInput } from './styled';
import CredentialInput from './Credentialnput';
import PasswordInput from './PasswordInput';
import MultiTextInput from './MultiTextInput';
import MaxValueInput from './MaxValueInput';
import JiraBucketsInput from './JiraBucketsInput';
import RangeSlider from './RangeSlider';
import LinkListInput from './LinkListInput';
import ToDoListInput from './ToDoListinput';
import WidgetTypeField from './WidgetTypeField';

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
    validator: () => string()
  },
  UsernameField: {
    component: TextInput,
    name: 'user',
    label: 'Username',
    validator: ({ max }) =>
      string()
        .trim()
        .max(max, vm.STRING_LENGTH('Label', max))
  },
  CurrentPasswordField: {
    component: PasswordInput,
    name: 'currentPassword',
    label: 'Current Password',
    validator: () => string().required(vm.FIELD_REQUIRED)
  },
  NewPasswordField: {
    component: PasswordInput,
    name: 'newPassword',
    label: 'New Password',
    validator: () => string().required(vm.FIELD_REQUIRED)
  },
  PasswordField: {
    component: PasswordInput,
    name: 'password',
    label: 'Password',
    validator: () => string()
  },
  PasswordConfirmationField: {
    component: PasswordInput,
    name: 'passwordConfirmation',
    label: 'Password confirmation',
    validator: () =>
      string().oneOf(
        [ref('password'), ref('newPassword'), null],
        vm.PASSWORD_MATCH
      )
  },
  TokenField: {
    component: MultilineTextInput,
    name: 'token',
    label: 'Token',
    validator: () => string()
  },
  SSHKeyField: {
    component: MultilineTextInput,
    name: 'sshKey',
    label: 'SSH Private Key',
    validator: () =>
      string()
        .matches('^-----BEGIN ([A-Z]{1,} )*PRIVATE KEY-----\n', {
          message: vm.SSH_KEY_BEGIN,
          excludeEmptyString: true
        })
        .matches('\n-----END ([A-Z]{1,} )*PRIVATE KEY-----$', {
          message: vm.SSH_KEY_END,
          excludeEmptyString: true
        })
  },
  PublicURL: {
    component: TextInput,
    name: 'publicUrl',
    label: 'Public URL',
    validator: () =>
      string().matches(/^(http|https|ws|ftp|ssh):\/\/.*([:.]).*/, {
        message: vm.INVALID_PUBLIC_URL(),
        excludeEmptyString: true
      })
  },
  WidgetTypeField: {
    component: WidgetTypeField,
    name: 'type',
    label: 'Type',
    validator: () => string().required(vm.FIELD_REQUIRED())
  },
  BoardTypeField: {
    component: DisplayValueSelect,
    name: 'type',
    label: 'Type',
    dropdownItems: parseTypes(boardTypes),
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
    min: 0,
    step: 1,
    pattern: /\d*/,
    valueUpdater: transformMinValue(),
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
    min: 0,
    step: 1,
    pattern: /\d*/,
    valueUpdater: transformMinValue(0.5),
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
    min: 0,
    step: 1,
    pattern: /\d*/,
    valueUpdater: transformMinValue(0.5),
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
    component: ConditionallyHidden(NumberInput, 'autoSwitch', value => value),
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
    initialValue: 60,
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
    validator: () =>
      string().matches(/^(http|https|ws|ftp|ssh):\/\/.*([:.]).*/, {
        message: vm.INVALID_URL(),
        excludeEmptyString: true
      })
  },
  IFrameURL: {
    component: TextInput,
    name: 'iframeUrl',
    label: 'URL',
    validator: () =>
      string().matches(/^(http|https|ws|ftp):\/\/.*([:.]).*/, {
        message: vm.INVALID_URL(),
        excludeEmptyString: true
      })
  },
  IdString: {
    component: TextInput,
    name: 'idString',
    label: 'ID',
    validator: () => string()
  },
  SonarQubeIdNumber: {
    component: ConditionallyHidden(
      NumberInput,
      'sonarQubeVersion',
      value => value === '5.x'
    ),
    name: 'idNumber',
    label: 'ID',
    step: 1,
    initialValue: 0,
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
  ZabbixMetricsInput: {
    component: DisplayValueSelect,
    name: 'selectedZabbixMetric',
    label: 'Metric',
    dropdownItems: ZABBIX_METRICS,
    initialValue: ZABBIX_METRICS[0].value,
    validator: () => string()
  },
  Host: {
    component: TextInput,
    name: 'host',
    label: 'Host',
    validator: () => string()
  },
  SliderRange: {
    component: RangeSlider,
    name: 'range',
    label: 'Range',
    initialValue: [60, 80],
    validator: () => array()
  },
  SliderMaxValue: {
    component: MaxValueInput,
    name: 'maxValue',
    label: 'Max Value',
    initialValue: 0,
    validator: () => number()
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
    component: ConditionallyHidden(
      DisplayValueSelect,
      'displayDate',
      value => value
    ),
    name: 'dateFormat',
    label: 'Date Format',
    dropdownItems: DATE_FORMATS,
    initialValue: DATE_FORMATS[1].value,
    validator: () => string()
  },
  TimeFormat: {
    component: ConditionallyHidden(
      DisplayValueSelect,
      'displayTime',
      value => value
    ),
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
    component: ConditionallyHidden(
      MultilineTextInput,
      'requestMethod',
      value => value === 'put' || value === 'post'
    ),
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
  ContentType: {
    component: DisplayValueSelect,
    name: 'contentType',
    label: 'Content Type',
    dropdownItems: CONTENT_TYPE,
    initialValue: CONTENT_TYPE[0].value,
    validator: () => string()
  },
  TextOrientation: {
    component: CheckboxInput,
    name: 'isVertical',
    label: 'Vertical Text',
    initialValue: false,
    validator: () => boolean()
  },
  MultiTextInput: {
    component: MultiTextInput,
    name: 'multiTextInput',
    label: 'Multi Text Component',
    initialValue: [],
    validator: () =>
      array()
        .ensure()
        .of(string())
  },
  DailySwitch: {
    component: CheckboxInput,
    name: 'randomPickerDailySwitch',
    label: 'Daily',
    initialValue: false,
    validator: () => boolean()
  },
  RandomPickerInterval: {
    component: ConditionallyHidden(
      NumberInput,
      'randomPickerDailySwitch',
      value => !value
    ),
    name: 'randomPickerInterval',
    label: 'Interval [min]',
    initialValue: 120,
    validator: () =>
      number().when('randomPickerDailySwitch', {
        is: true,
        then: number().required(),
        otherwise:
          number().notRequired() && number().positive() && number().min(0)
      })
  },
  RandomCheckbox: {
    component: CheckboxInput,
    name: 'randomizeCheckbox',
    label: 'Randomize',
    initialValue: false,
    validator: () => boolean()
  },
  ExpandableContent: {
    component: CheckboxInput,
    name: 'expandContent',
    label: 'Expandable Content',
    initialValue: false,
    validator: () => boolean()
  },
  SonarQubeVersion: {
    component: DisplayValueSelect,
    name: 'sonarQubeVersion',
    label: 'SonarQube Version',
    dropdownItems: SONARQUBE_VERSIONS,
    initialValue: SONARQUBE_VERSIONS[0].value,
    validator: () => string()
  },
  AemBundleExcluded: {
    component: MultilineTextInput,
    name: 'excludedBundles',
    label:
      'Excluded bundles (either symbolic or display name; each line is a new entry)',
    validator: () => string()
  },
  AemBundleResolvedThreshold: {
    component: NumberInput,
    name: 'resolvedThreshold',
    label: 'Error threshold for bundles with "resolved" status',
    min: 0,
    step: 1,
    initialValue: 2,
    validator: () =>
      number()
        .min(0)
        .required(vm.FIELD_REQUIRED())
  },
  AemBundleInstalledThreshold: {
    component: NumberInput,
    name: 'installedThreshold',
    label: 'Error threshold for bundles with "installed" status',
    min: 0,
    step: 1,
    initialValue: 2,
    validator: () =>
      number()
        .min(0)
        .required(vm.FIELD_REQUIRED())
  },
  JiraBuckets: {
    component: JiraBucketsInput,
    name: 'bucketQueries',
    initialValue: [],
    validator: () => array().ensure()
  },
  ToDoListItems: {
    component: ToDoListInput,
    name: 'toDoListItems',
    initialValue: [],
    validator: () => array().ensure()
  },
  LinkListItems: {
    component: LinkListInput,
    name: 'linkListItems',
    initialValue: [],
    validator: () => array().ensure()
  },
  LogLinesField: {
    component: NumberInput,
    name: 'logLinesField',
    label: 'Number of lines to return',
    initialValue: 1000,
    min: 1,
    step: 1,
    pattern: /\d*/,
    valueUpdater: transformMinValue(),
    validator: ({ min, max }) =>
      number()
        .min(min, vm.NUMBER_MIN('Lines', min))
        .max(max, vm.NUMBER_MAX('Lines', max))
        .required(vm.FIELD_REQUIRED())
  },
  LogFileSizeField: {
    component: NumberInput,
    name: 'logFileSizeField',
    label: 'Log file size limit [MB]',
    initialValue: 50,
    min: 1,
    step: 1,
    pattern: /\d*/,
    valueUpdater: transformMinValue(),
    validator: ({ min, max }) =>
      number()
        .min(min, vm.NUMBER_MIN('File size [MB]', min))
        .max(max, vm.NUMBER_MAX('File size [MB]', max))
        .required(vm.FIELD_REQUIRED())
  },
  LogRecordExpirationField: {
    component: NumberInput,
    name: 'logRecordExpirationField',
    label: 'Log record expiration period [days]',
    initialValue: 5,
    min: 1,
    step: 1,
    pattern: /\d*/,
    valueUpdater: transformMinValue(),
    validator: ({ min, max }) =>
      number()
        .min(min, vm.NUMBER_MIN('Days', min))
        .max(max, vm.NUMBER_MAX('Days', max))
        .required(vm.FIELD_REQUIRED())
  }
};

export default dialogFields;
