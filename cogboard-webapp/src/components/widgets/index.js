import DefaultWidget from './types/DefaultWidget';
import ExampleWidget from './types/ExampleWidget';
import JenkinsJobWidget from "./types/JenkinsJobWidget";
import SonarQubeWidget from "./types/SonarQubeWidget";
import ServiceCheckWidget from "./types/ServiceCheckWidget";
import TextWidget from "./types/TextWidget";
import BambooPlanWidget from "./types/BambooPlanWidget";
import IFrameEmbedWidget from "./types/IFrameEmbedWidget";

const widgetTypes = {
  DefaultWidget: {
    name: 'Default',
    component: DefaultWidget
  },
  ExampleWidget: {
    name: 'Example widget',
    component: ExampleWidget,
    dialogFields: ['SchedulePeriod']
  },
  JenkinsJobWidget: {
    name: 'Jenkins Job widget',
    component: JenkinsJobWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'Path']
  },
  SonarQubeWidget: {
    name: 'SonarQube widget',
    component: SonarQubeWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'Key', 'IdNumber', 'SonarQubeMetricsInput']
  },
  ServiceCheckWidget: {
    name: 'Service Check widget',
    component: ServiceCheckWidget,
    dialogFields: ['SchedulePeriod', 'URL', 'StatusCode']
  },
  TextWidget: {
    name: 'Text Widget',
    component: TextWidget,
    dialogFields: ['Text', 'TextSize', 'TextOrientation']
  },
  BambooPlanWidget: {
    name: 'Bamboo Plan widget',
    component: BambooPlanWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'IdString']
  },
  IFrameEmbedWidget: {
    name: 'IFrame Embed widget',
    component: IFrameEmbedWidget,
    dialogFields: ['UrlForContent']
  }
};

export default widgetTypes;