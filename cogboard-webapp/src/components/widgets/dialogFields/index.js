import EndpointField from './EndpointField';
import NumberField from './NumberField';

const dialogFields = {
  EndpointField: {
    component: EndpointField,
    name: 'endpoint',
    label: 'Endpoint',
    itemsUrl: '/endpoints.json'
  },
  ScheduleDelay: {
    component: NumberField,
    name: 'scheduleDelay',
    label: 'Schedule Delay',
    min: 0,
    step: 500
  }
};

export default dialogFields;