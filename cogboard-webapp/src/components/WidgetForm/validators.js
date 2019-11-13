import { createValidationSchema } from '../validation';

import widgetTypes from '../widgets';

export const createWidgetValidationSchema = (type, fields, constraints={}) => {
  const widgetType = widgetTypes[type];
  const dialogFieldNames = (widgetType && widgetType.dialogFields) ? widgetType.dialogFields : [];
  const allFields = [...fields, ...dialogFieldNames];
  const widgetConstraints = (widgetType && widgetType.validationConstraints) ? widgetType.validationConstraints : {};

  const allConstraints = { ...widgetConstraints, ...constraints }; 

  return createValidationSchema(allFields, allConstraints);
}