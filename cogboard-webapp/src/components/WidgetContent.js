import React from 'react'

import widgetTypes from './widgets';

const WidgetContent = ({type, content}) =>  {
  const WidgetType = widgetTypes[type].component;

  return <WidgetType {...content} />
};

export default WidgetContent;