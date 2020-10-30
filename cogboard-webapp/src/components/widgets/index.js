import WhiteSpaceWidget from './types/WhiteSpaceWidget';
import JenkinsJobWidget from './types/JenkinsJobWidget';
import SonarQubeWidget from './types/SonarQubeWidget';
import ServiceCheckWidget from './types/ServiceCheckWidget';
import TextWidget from './types/TextWidget';
import JiraBucketsWidget from './types/JiraBucketsWidget';
import BambooDeploymentWidget from './types/BambooDeploymentWidget';
import BambooPlanWidget from './types/BambooPlanWidget';
import WorldClockWidget from './types/WorldClockWidget';
import CheckboxWidget from './types/CheckboxWidget';
import AemHealthcheckWidget from './types/AemHealthcheckWidget';
import IframeEmbedWidget from './types/IframeEmbedWidget';
import RandomPickerWidget from './types/RandomPickerWidget';
import AemBundleInfoWidget from './types/AemBundleInfoWidget';
import ZabbixWidget from './types/ZabbixWidget';
import LinkListWidget from './types/LinkListWidget';
import ToDoListWidget from './types/ToDoListWidget';

const widgetTypes = {
  WhiteSpaceWidget: {
    component: WhiteSpaceWidget,
    initialStatus: 'TRANSPARENT'
  },
  JenkinsJobWidget: {
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
    component: TextWidget,
    dialogFields: ['Text', 'TextSize', 'TextOrientation', 'ExpandableContent'],
    validationConstraints: {
      Text: { max: 240 }
    },
    initialStatus: 'NONE'
  },
  JiraBucketsWidget: {
    component: JiraBucketsWidget,
    dialogFields: ['EndpointField', 'SchedulePeriod', 'JiraBuckets'],
    showUpdateTime: true,
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    },
    initialStatus: 'NONE'
  },
  BambooPlanWidget: {
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
    component: WorldClockWidget,
    dialogFields: [
      'TimeZoneId',
      'DisplayDate',
      'DateFormat',
      'DisplayTime',
      'TimeFormat',
      'TextSize'
    ],
    initialStatus: 'NONE'
  },
  IframeEmbedWidget: {
    component: IframeEmbedWidget,
    dialogFields: ['IFrameURL'],
    initialStatus: 'NONE'
  },
  CheckboxWidget: {
    component: CheckboxWidget,
    showUpdateTime: true,
    initialStatus: 'CHECKBOX_UNKNOWN'
  },
  AemHealthcheckWidget: {
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
  RandomPickerWidget: {
    component: RandomPickerWidget,
    dialogFields: [
      'RandomCheckbox',
      'DailySwitch',
      'RandomPickerInterval',
      'MultiTextInput'
    ],
    showUpdateTime: false,
    initialStatus: 'NONE'
  },
  AemBundleInfoWidget: {
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
  },
  ZabbixWidget: {
    component: ZabbixWidget,
    dialogFields: [
      'EndpointField',
      'SchedulePeriod',
      'Host',
      'ZabbixMetricsInput',
      'SliderMaxValue',
      'SliderRange'
    ],
    showUpdateTime: true,
    initialStatus: 'NONE',
    validationConstraints: {
      SchedulePeriod: { min: 3 }
    }
  },
  ToDoListWidget: {
    component: ToDoListWidget,
    dialogFields: ['ToDoListItems'],
    initialStatus: 'NONE'
  },
  LinkListWidget: {
    component: LinkListWidget,
    dialogFields: ['LinkListItems'],
    initialStatus: 'NONE'
  }
};

export default widgetTypes;
