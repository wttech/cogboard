import WidgetBoard from './types/WidgetBoard';
import IframeBoard from './types/IframeBoard';

import boardActionsConfig from '../BoardActions/config';

const { Add, Save } = boardActionsConfig;

const boardTypes = {
  WidgetBoard: {
    component: WidgetBoard,
    dialogFields: ['ColumnField'],
    actions: [Save, Add]
  },
  IframeBoard: {
    component: IframeBoard,
    dialogFields: ['IFrameURL'],
    actions: [Save]
  }
};

export default boardTypes;
