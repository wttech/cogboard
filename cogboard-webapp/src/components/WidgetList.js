import React from 'react';
import { useSelector } from 'react-redux';

import Widget from './Widget';

const WidgetList = ({ currentBoard }) => {
  const widgetsIds = useSelector(
    state => state.boards.boardsById[currentBoard].widgets
  );
  const widgets = useSelector(
    state => widgetsIds.map(widgetId => state.widgets.widgetsById[widgetId])
  );

  return (
    widgets.map(widget =>
      <Widget
        key={widget.id}
        widgetData={widget}
        currentBoard={currentBoard}
      />
    )
  );
}

export default WidgetList;