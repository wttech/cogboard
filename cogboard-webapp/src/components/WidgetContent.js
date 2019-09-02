import React from 'react'
import { object, string } from 'prop-types';

import widgetTypes from './widgets';

const WidgetContent = ({ type, content }) =>  {
  const notFoundMessage = 'Widget type not found';
  const WidgetType = widgetTypes[type] ? widgetTypes[type].component : () => notFoundMessage;

  return <WidgetType { ...content } />;
};

WidgetContent.propTypes = {
  content: object,
  type: string.isRequired
};

export default WidgetContent;