import { filterByRegExp } from './helpers';

const logHeader = {
  _id: '61b4c753bc103d391657c49c',
  seq: 228,
  insertedOn: 1639237459,
  date: '2021-12-11T15:44:00',
  type: 'DEBUG',
  variableData: null
};

it('filter by regexp', () => {
  const filters = [
    {
      id: 'filter-3ea57f8b-6c1c-4e2f-bbc5-760aa0526e8e',
      checked: true,
      regExp: '^a',
      label: 'starts with a'
    },
    {
      id: 'filter-2afee54b-8ab6-4a0c-81db-9c92e7bf5203',
      checked: true,
      label: 'velit',
      regExp: 'velit'
    },
    {
      id: 'filter-b9b72673-e6ca-481d-996a-293527032764',
      checked: true,
      label: 'starts with F',
      regExp: '^F'
    },
    {
      id: 'filter-c9dac795-43c6-4a57-9329-5dd1573c9bf4',
      checked: true,
      label: 'ends with suscipit',
      regExp: 'suscipit$'
    }
  ];

  const log = {
    ...logHeader,
    variableData: [
      {
        header: 'FelixStartLevel',
        description: 'No description'
      },
      {
        header: 'id velit. vel pretium. ipsum suscipit',
        description: 'No message description'
      }
    ]
  };
  const emptyLog = {
    ...logHeader,
    variableData: [
      {
        header: '',
        description: ''
      }
    ]
  };

  expect(filterByRegExp(log, [])).toEqual(true);

  // starts with a; velit
  expect(filterByRegExp(log, [filters[0], filters[1]])).toEqual(false);
  // starts with a(OFF); velit
  expect(
    filterByRegExp(log, [{ ...filters[0], checked: false }, filters[1]])
  ).toEqual(true);
  // velit; starts with F; ends with suscipit
  expect(filterByRegExp(log, [filters[1], filters[2], filters[3]])).toEqual(
    true
  );

  expect(filterByRegExp(emptyLog, filters)).toEqual(false);
});
