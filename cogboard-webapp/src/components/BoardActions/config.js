import Add from './types/Add';
import Save from './types/Save';

export const boardActionsConfig = {
  Add: {
    component: Add,
    config: {
      ariaLabel: 'Add Widget',
      color: 'primary',
      cypressData: 'main-template-add-widget-button'
    }
  },
  Save: {
    component: Save,
    config: {
      ariaLabel: 'Save Data',
      color: 'secondary',
      cypressData: 'main-template-save-data-button'
    }
  }
};

export default boardActionsConfig;
