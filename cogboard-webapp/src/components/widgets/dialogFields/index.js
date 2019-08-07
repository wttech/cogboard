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
  IdString: {
    component: TextInput,
    name: 'idString',
    label: 'ID'
  },
  Index: {
    component: NumberInput,
    name: 'index',
    label: 'Index',
    min: 0,
    step: 1
  },
  SonarQubeMetricsInput: {
    component: SonarQubeMetricsInput,
    name: 'selectedMetrics'
  }
};

export default dialogFields;