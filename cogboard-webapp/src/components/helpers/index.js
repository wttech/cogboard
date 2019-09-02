export const setSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;

export const splitPropsGroupName = (propName) => {
  return propName.includes('.') ? propName.split('.') : [undefined, propName];
};