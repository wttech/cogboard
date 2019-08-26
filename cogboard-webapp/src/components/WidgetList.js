import React from 'react';
import { array } from 'prop-types';

import Widget from './Widget';

const WidgetList = ({ widgets: widgetIds }) => {
  return (
    widgetIds.map(widgetId =>
      <Widget
        key={widgetId}
        id={widgetId}
      />
    )
  );
};

WidgetList.propTypes = {
  widgets: array.isRequired
};

export default WidgetList;