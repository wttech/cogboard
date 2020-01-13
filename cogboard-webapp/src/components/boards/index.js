import WidgetBoard from './types/WidgetBoard';
import IframeBoard from './types/IframeBoard';

const boardTypes = {
  WidgetBoard: {
    name: 'Widget Board',
    component: WidgetBoard,
    dialogFields: ['ColumnField']
  },
  IframeBoard: {
    name: 'Iframe Board',
    component: IframeBoard,
    dialogFields: ['IFrameURL']
  }
};

export default boardTypes;
