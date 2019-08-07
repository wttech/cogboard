import React from 'react';
import { string } from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';

import Widget from './Widget';

const WidgetList = ({ currentBoard }) => {
  const widgetIds = useSelector(
    state => state.boards.boardsById[currentBoard].widgets,
    shallowEqual
  );

  return (
    widgetIds.map(widgetId =>
      <Widget
        key={widgetId}
        id={widgetId}
        currentBoard={currentBoard}
      />
    )
  );
}

WidgetList.propTypes = {
  currentBoard: string.isRequired
}

export default WidgetList;