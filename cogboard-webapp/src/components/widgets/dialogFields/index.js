import EndpointInput from './EndpointInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import SonarQubeMetricsInput from './SonarQubeMetricsInput';

const dialogFields = {
  EndpointField: {
    component: EndpointInput,
    name: 'endpoint',
    label: 'Endpoint',
    itemsUrl: '/api/endpoints'
  },
  ScheduleDelay: {
    component: NumberInput,
    name: 'scheduleDelay',
    label: 'Schedule Delay',
    min: 0,
    step: 500
  },
  SchedulePeriod: {
    component: NumberInput,
    name: 'schedulePeriod',
    label: 'Schedule Period',
    min: 5000,
    step: 500
  },
  Path: {
    component: TextInput,
    name: 'path',
    label: 'Path'
  },
  Key: {
    component: TextInput,
    name: 'key',
    label: 'Key'
  },
  IdNumber: {
    component: NumberInput,
    name: 'idNumber',
    label: 'ID',
    min: 0,
    step: 1
  },
  SonarQubeMetricsInput: {
    component: SonarQubeMetricsInput,
    name: 'selectedMetrics'
  }
};

export default dialogFields;