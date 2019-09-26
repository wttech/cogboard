import DefaultWidget from './types/DefaultWidget';
import ExampleWidget from './types/ExampleWidget';
import JenkinsJobWidget from "./types/JenkinsJobWidget";
import SonarQubeWidget from "./types/SonarQubeWidget";
import ServiceCheckWidget from "./types/ServiceCheckWidget";
import TextWidget from "./types/TextWidget";
import BambooPlanWidget from "./types/BambooPlanWidget";
import LinkListWidget from "./types/LinkListWidget";
import WorldClockWidget from "./types/WorldClockWidget";
import CheckboxWidget from './types/CheckboxWidget';
import AemHealthcheckWidget from "./types/AemHealthcheckWidget";
import IframeEmbedWidget from "./types/IframeEmbedWidget";

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
  LinkListWidget: {
    name: 'Link list widget',
    component: LinkListWidget,
    dialogFields: ['LinkListField']
  },
  WorldClockWidget: {
    name: 'World Clock widget',
    component: WorldClockWidget,
    dialogFields: ['TimeZoneId', 'DateFormat', 'TimeFormat', 'DisplayDate', 'DisplayTime', 'DateTimeSize']
  },
  IframeEmbedWidget: {
    name: 'Iframe Embed widget',
    component: IframeEmbedWidget,
    dialogFields: ['UrlForContent']
  },
  CheckboxWidget: {
    name: 'Checkbox widget',
    component: CheckboxWidget,
    showUpdateTime : true
  },
  AemHealthcheckWidget: {
    name: 'AEM Healthcheck widget',
    component: AemHealthcheckWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'AemHealthcheckInput'],
    showUpdateTime : true
  }
};

export default widgetTypes;