import { isLogHighlighted } from './helpers';

const logHeader = {
  _id: '61b4c753bc103d391657c49c',
  seq: 228,
  insertedOn: 1639237459,
  date: '2021-12-11T15:44:00',
  type: 'DEBUG',
  variableData: null
};

it('log highlighting', () => {
  const variableData = [
    {
      header: 'FelixStartLevel',
      description: 'No description'
    },
    {
      header: 'id velit. vel pretium. ipsum suscipit',
      description: 'No message description'
    }
  ];
  const log = { ...logHeader, variableData };

  expect(isLogHighlighted(log, 'eli')).toEqual(true);
  expect(isLogHighlighted(log, 'ELI')).toEqual(true);
  expect(isLogHighlighted(log, 'id velit')).toEqual(true);
  expect(isLogHighlighted(log, 'cipit')).toEqual(true);
  expect(isLogHighlighted(log, 'val')).toEqual(false);
  expect(isLogHighlighted(log, 'FelixStartLevel')).toEqual(true);
  expect(isLogHighlighted(log, 'description')).toEqual(true);
  expect(isLogHighlighted(log, 'message')).toEqual(true);
  expect(isLogHighlighted(log, '')).toBeFalsy();
});
