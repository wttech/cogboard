import React from 'react';
import { object, string } from 'prop-types';

import widgetTypes from './widgets';

const WidgetContent = ({ id, type, content }) => {
  const notFoundMessage =
    'Widget type not found. Delete or update this widget.';
  const WidgetType = widgetTypes[type]
    ? widgetTypes[type].component
    : () => notFoundMessage;

  return <WidgetType id={id} {...content} />;
};

WidgetContent.propTypes = {
  content: object,
  type: string.isRequired
};

export default WidgetContent;
