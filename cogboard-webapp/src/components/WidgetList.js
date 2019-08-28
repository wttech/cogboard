import React from 'react';
import { array } from 'prop-types';

import Widget from './Widget';

const WidgetList = ({ widgets: widgetIds }) => {
  return (
    widgetIds.map((widgetId, index) =>
      <Widget
        key={widgetId}
        id={widgetId}
        index={index}
      />
    )
  );
};

WidgetList.propTypes = {
  widgets: array.isRequired
};

export default WidgetList;