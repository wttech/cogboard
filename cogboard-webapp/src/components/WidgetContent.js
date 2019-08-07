import React from 'react'
import { object, string } from 'prop-types';

import widgetTypes from './widgets';

const WidgetContent = ({type, content}) =>  {
  const WidgetType = widgetTypes[type].component;

  return <WidgetType {...content} />
};

WidgetContent.propTypes = {
  content: object,
  type: string.isRequired
};

export default WidgetContent;