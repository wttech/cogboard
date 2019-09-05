import DefaultWidget from './types/DefaultWidget';
import ExampleWidget from './types/ExampleWidget';
import JenkinsJobWidget from "./types/JenkinsJobWidget";
import SonarQubeWidget from "./types/SonarQubeWidget";
import ServiceCheckWidget from "./types/ServiceCheckWidget";
import TextWidget from "./types/TextWidget";
import BambooPlanWidget from "./types/BambooPlanWidget";
import WorldClockWidget from "./types/WorldClockWidget";
import IFrameEmbedWidget from "./types/IFrameEmbedWidget";
import CheckboxWidget from './types/CheckboxWidget';

const widgetTypes = {
  DefaultWidget: {
    name: 'Default',
    component: DefaultWidget
  },
  ExampleWidget: {
    name: 'Example widget',
    component: ExampleWidget,
    dialogFields: ['SchedulePeriod'],
    showUpdateTime : true
  },
  JenkinsJobWidget: {
    name: 'Jenkins Job widget',
    component: JenkinsJobWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'Path'],
    showUpdateTime : true
  },
  SonarQubeWidget: {
    name: 'SonarQube widget',
    component: SonarQubeWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'Key', 'IdNumber', 'SonarQubeMetricsInput'],
    showUpdateTime : true
  },
  ServiceCheckWidget: {
    name: 'Service Check widget',
    component: ServiceCheckWidget,
    dialogFields: ['SchedulePeriod', 'URL', 'StatusCode'],
    showUpdateTime : true
  },
  TextWidget: {
    name: 'Text Widget',
    component: TextWidget,
    dialogFields: ['Text', 'TextSize', 'TextOrientation']
  },
  BambooPlanWidget: {
    name: 'Bamboo Plan widget',
    component: BambooPlanWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'IdString'],
    showUpdateTime : true
  },
  WorldClockWidget: {
    name: 'World Clock widget',
    component: WorldClockWidget,
    dialogFields: ['TimeZoneId', 'DateTimeFormat']
  },
  IFrameEmbedWidget: {
    name: 'IFrame Embed widget',
    component: IFrameEmbedWidget,
    dialogFields: ['UrlForContent']
  },
  CheckboxWidget: {
    name: 'Checkbox widget',
    component: CheckboxWidget
  }
};

export default widgetTypes;