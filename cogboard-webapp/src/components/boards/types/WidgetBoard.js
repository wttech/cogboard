import React from 'react';
import { array } from 'prop-types';
import Widget from '../../Widget';

const WidgetBoard = ({ currentBoard: { widgets: widgetIds } }) => {
  return widgetIds.map((widgetId, index) => (
    <Widget key={widgetId} id={widgetId} index={index} />
  ));
};

WidgetBoard.propTypes = {
  widgets: array.isRequired
};

export default WidgetBoard;
