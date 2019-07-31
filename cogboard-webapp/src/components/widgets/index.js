import DefaultWidget from './types/DefaultWidget';
import ExampleWidget from './types/ExampleWidget';
import ExampleWidgetDialog from './types/ExampleWidgetDialog';
import JenkinsJobWidget from "./types/JenkinsJobWidget";

const widgetTypes = {
  DefaultWidget: {
    name: 'Default',
    component: DefaultWidget
  },
  ExampleWidget: {
    name: 'Example widget',
    component: ExampleWidget,
    dialog: ExampleWidgetDialog
  },
  JenkinsJobWidget: {
    name: 'Jenkins Job widget',
    component: JenkinsJobWidget,
    endpoints: true
  }
};

export default widgetTypes;