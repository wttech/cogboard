import { object, string, number, boolean } from 'yup';
import widgetTypes from '../widgets';
import { dialogFieldsValidators } from '../widgets/dialogFields/validators';
import { splitPropsGroupName } from '../helpers';

export const createValidationSchema = () => {

  return object().shape({
    type: string()
      .required(),
    title: string()
      .trim()
      .max(25)
      .min(1)
      .required(),
    columns: number()
      .min(1)
      .max(4)
      .required(),
    rows: number()
      .min(1)
      .max(3)
      .required(),
    goNewLine: boolean()
      .required(),
    disabled: boolean()
      .required()
  }).strip(true)
}

export const validationSchemaModificator = (type, validationSchema) => {
  const widgetType = widgetTypes[type];
  const dialogFieldNames = (widgetType && widgetType.dialogFields) ? widgetType.dialogFields : [];

  const validators = dialogFieldNames.reduce((schema, fieldName) => {
    const { name, validator } = dialogFieldsValidators[fieldName];
    const [groupName, propName] = splitPropsGroupName(name);
    let newSchema;

    if (groupName) {
      const groupSchema = schema[groupName] !== undefined ? schema[groupName] : object({});

      newSchema = {
          ...schema,
          [groupName]: groupSchema.shape({[propName]: validator})
        };
    } else {
      newSchema = { ...schema, [propName]: validator};
    }

    return newSchema;
  }, {})

  const newValidationSchema = validationSchema.shape(validators)
  
  return newValidationSchema
}