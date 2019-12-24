import WhiteSpaceWidget from './types/WhiteSpaceWidget';
import ExampleWidget from './types/ExampleWidget';
import JenkinsJobWidget from './types/JenkinsJobWidget';
import SonarQubeWidget from './types/SonarQubeWidget';
import ServiceCheckWidget from './types/ServiceCheckWidget';
import TextWidget from './types/TextWidget';
import BambooDeploymentWidget from './types/BambooDeploymentWidget';
import BambooPlanWidget from './types/BambooPlanWidget';
import WorldClockWidget from './types/WorldClockWidget';
import CheckboxWidget from './types/CheckboxWidget';
import AemHealthcheckWidget from './types/AemHealthcheckWidget';
import IframeEmbedWidget from './types/IframeEmbedWidget';
import AemBundleInfoWidget from './types/AemBundleInfoWidget';

const widgetTypes = {
  WhiteSpaceWidget: {
    name: 'White Space',
    component: WhiteSpaceWidget
  },
  ExampleWidget: {
    name: 'Example',
    component: ExampleWidget,
    dialogFields: ['SchedulePeriod'],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    }
  },
  JenkinsJobWidget: {
    name: 'Jenkins Job',
    component: JenkinsJobWidget,
    dialogFields: [
      'EndpointField',
      'SchedulePeriod',
      'Path',
      'ExpandableContent'
    ],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    }
  },
  SonarQubeWidget: {
    name: 'SonarQube',
    component: SonarQubeWidget,
    dialogFields: [
      'SonarQubeVersion',
      'EndpointField',
      'SchedulePeriod',
      'Key',
      'SonarQubeIdNumber',
      'SonarQubeMetricsInput',
      'ExpandableContent'
    ],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 },
      SonarQubeMetricsInput: { minArrayLength: 1 }
    }
  },
  ServiceCheckWidget: {
    name: 'Service Check',
    component: ServiceCheckWidget,
    dialogFields: [
      'SchedulePeriod',
      'RequestMethod',
      'EndpointField',
      'Path',
      'RequestBody',
      'ResponseBody',
      'StatusCode',
      'ExpandableContent'
    ],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    }
  },
  TextWidget: {
    name: 'Text',
    component: TextWidget,
    dialogFields: ['Text', 'TextSize', 'TextOrientation'],
    validationConstraints: {
      Text: { max: 240 }
    }
  },
  BambooPlanWidget: {
    name: 'Bamboo Plan',
    component: BambooPlanWidget,
    dialogFields: [
      'EndpointField',
      'SchedulePeriod',
      'IdString',
      'ExpandableContent'
    ],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    }
  },
  BambooDeploymentWidget: {
    name: 'Bamboo Deployment',
    component: BambooDeploymentWidget,
    dialogFields: [
      'EndpointField',
      'SchedulePeriod',
      'IdString',
      'ExpandableContent'
    ],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    }
  },
  WorldClockWidget: {
    name: 'World Clock',
    component: WorldClockWidget,
    dialogFields: [
      'TimeZoneId',
      'DateFormat',
      'TimeFormat',
      'DisplayDate',
      'DisplayTime',
      'TextSize'
    ]
  },
  IframeEmbedWidget: {
    name: 'Iframe Embed',
    component: IframeEmbedWidget,
    dialogFields: ['IFrameURL']
  },
  CheckboxWidget: {
    name: 'Checkbox',
    component: CheckboxWidget,
    showUpdateTime: true
  },
  AemHealthcheckWidget: {
    name: 'AEM Healthcheck',
    component: AemHealthcheckWidget,
    dialogFields: [
      'EndpointField',
      'SchedulePeriod',
      'AemHealthcheckInput',
      'ExpandableContent'
    ],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 },
      AemHealthcheckInput: { minArrayLength: 1 }
    }
  },
  AemBundleInfoWidget: {
    name: 'AEM Bundle Info',
    component: AemBundleInfoWidget,
    dialogFields: [
      'EndpointField',
      'SchedulePeriod',
      'AemBundleResolvedThreshold',
      'AemBundleInstalledThreshold',
      'AemBundleExcluded',
      'ExpandableContent'
    ],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    }
  }
};

export default widgetTypes;
