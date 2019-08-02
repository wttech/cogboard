import React from 'react'

import widgetTypes from './widgets';

const WidgetContent = ({contentType, content}) =>  {
  const WidgetType = widgetTypes[contentType].component;

  return <WidgetType {...content} />
};

export default WidgetContent;