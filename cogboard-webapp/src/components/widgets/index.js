import DefaultWidget from './types/DefaultWidget';
import ExampleWidget from './types/ExampleWidget';
import JenkinsJobWidget from "./types/JenkinsJobWidget";

const widgetTypes = {
  DefaultWidget: {
    name: 'Default',
    component: DefaultWidget
  },
  ExampleWidget: {
    name: 'Example widget',
    component: ExampleWidget,
    dialogFields: ['ScheduleDelay']
  },
  JenkinsJobWidget: {
    name: 'Jenkins Job widget',
    component: JenkinsJobWidget,
    dialogFields: ['EndpointField', 'ScheduleDelay']
  }
};

export default widgetTypes;