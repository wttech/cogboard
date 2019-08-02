import EndpointInput from './EndpointInput';
import NumberInput from './NumberInput';
import TextInput from './TextInput';

const dialogFields = {
  EndpointField: {
    component: EndpointInput,
    name: 'endpoint',
    label: 'Endpoint',
    itemsUrl: '/endpoints.json'
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
  }
};

export default dialogFields;