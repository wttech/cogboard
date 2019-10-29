import { object, string, number, boolean } from 'yup';

import { splitPropsGroupName } from '../helpers';

import { WIDGET_COLUMNS_MIN, WIDGET_ROWS_MIN, WIDGET_ROWS_MAX, WIDGET_TITLE_LENGTH_LIMIT } from '../../constants';
import widgetTypes from '../widgets';
import { dialogFieldsValidators } from '../widgets/dialogFields/validators';

const MAX_TITLE_LENGTH = `Title length must be less or equal to ${WIDGET_TITLE_LENGTH_LIMIT}.`;
const MIN_TITLE_LENGTH = 'Title cannot be empty.';
const REQUIRED_TITLE = 'Title is a required field.';

const COLUMNS_NUMBER_MIN = `Columns number cannot be less than ${WIDGET_COLUMNS_MIN}.`;
const COLUMNS_REQUIRED = `Columns is a required field.`;

const ROWS_NUMBER_MIN = `Rows number cannot be less than ${WIDGET_ROWS_MIN}.`;
const ROWS_NUMBER_MAX = `Rows number cannot be more than ${WIDGET_ROWS_MAX}.`;
const ROWS_REQUIRED = `Rows is a required field.`;

export const createValidationSchema = ( boardColumns ) => {

  const COLUMNS_NUMBER_MAX = `Columns number cannot be more than ${boardColumns}.`;

  return object().shape({
    type: string()
      .required(),
    title: string()
      .trim()
      .max(WIDGET_TITLE_LENGTH_LIMIT, MAX_TITLE_LENGTH)
      .min(1, MIN_TITLE_LENGTH)
      .required(REQUIRED_TITLE),
    columns: number()
      .min(WIDGET_COLUMNS_MIN, COLUMNS_NUMBER_MIN)
      .max(boardColumns, COLUMNS_NUMBER_MAX)
      .required(COLUMNS_REQUIRED),
    rows: number()
      .min(WIDGET_ROWS_MIN, ROWS_NUMBER_MIN)
      .max(WIDGET_ROWS_MAX, ROWS_NUMBER_MAX)
      .required(ROWS_REQUIRED),
    goNewLine: boolean()
      .required(),
    disabled: boolean()
      .required()
  })
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