import { object } from 'yup';

import dialogFields from '../widgets/dialogFields';
import { validationMessages as vm } from '../../constants';
import { splitPropsGroupName } from '../../utils/components';

export const createValidationSchema = (fields, constraints) => {
  const validators = Array.prototype
    .concat(...fields)
    .reduce((schema, fieldName) => {
      const { name, validator } = dialogFields[fieldName];
      const [groupName, propName] = splitPropsGroupName(name);
      const constraint =
        constraints[fieldName] !== undefined ? constraints[fieldName] : {};
      let newSchema;

      if (groupName) {
        const groupSchema =
          schema[groupName] !== undefined ? schema[groupName] : object({});

        newSchema = {
          ...schema,
          [groupName]: groupSchema.shape({ [propName]: validator(constraint) })
        };
      } else {
        newSchema = { ...schema, [propName]: validator(constraint) };
      }

      return newSchema;
    }, {});

  const newValidationSchema = object().shape(validators);

  return newValidationSchema;
};

export const uniqueFieldTestCreator = (
  itemId,
  items,
  valueExtFn,
  idExtFn = data => data.id
) => ({
  name: 'uniqueField',
  params: { items, itemId },
  message: vm.UNIQUE_FIELD(),
  exclusive: true,
  test: field =>
    items.every(item => valueExtFn(item) !== field || idExtFn(item) === itemId)
});
