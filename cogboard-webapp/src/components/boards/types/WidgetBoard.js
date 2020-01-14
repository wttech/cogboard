import React from 'react';
import { array, shape } from 'prop-types';
import Widget from '../../Widget';

const WidgetBoard = ({ currentBoard: { widgets: widgetIds } }) => {
  return widgetIds.map((widgetId, index) => (
    <Widget key={widgetId} id={widgetId} index={index} />
  ));
};

WidgetBoard.propTypes = {
  currentBoard: shape({
    widgets: array.isRequired
  }).isRequired
};

export default WidgetBoard;
