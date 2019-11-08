import React from 'react';

import { MenuItem } from '@material-ui/core';

export const renderWidgetTypesMenu = widgetTypes =>
  Object.entries(widgetTypes).map(([type, { name }]) => (
    <MenuItem key={type} value={type} data-cy="widget-type-select-item">
      {name}
    </MenuItem>
  ));
