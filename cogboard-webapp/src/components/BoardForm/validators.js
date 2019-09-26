import * as yup from 'yup';

import { COLUMNS_MAX, COLUMNS_MIN, BOARD_TITLE_LENGTH_LIMIT, SWITCH_INTERVAL_MIN } from '../../constants';

const MAX_TITLE_LENGTH = `Title length must be less than or equal to ${BOARD_TITLE_LENGTH_LIMIT}`;
const MIN_TITLE_LENGTH = 'Title cannot be empty';
const UNIQUE_MESSAGE = 'Title must be unique';
const REQUIRED_TITLE = 'Title is a required field';

const COLUMNS_NUMBER = `Columns number should be between ${COLUMNS_MIN} and ${COLUMNS_MAX}`;

const MIN_SWITCH_INTERVAL = `Interval cannot be smaller than ${SWITCH_INTERVAL_MIN}s.`;

export const TITLE_MESSAGES = [MAX_TITLE_LENGTH, UNIQUE_MESSAGE, REQUIRED_TITLE];
export const COLUMNS_MESSAGES = [COLUMNS_NUMBER];
export const SWITCH_INTERVAL_MESSAGES = [MIN_SWITCH_INTERVAL];

const uniqueTitleTestCreator = (boardId, boards) => 
  ({
    name: 'uniqueTitle',
    params: { boards, boardId },
    message: UNIQUE_MESSAGE,
    exclusive: true,
    test: (title) => 
      boards.every(
        (board) => board.title !== title || 
        (board.title === title && board.id === boardId))
  })


export const createValidationSchema = (boardId, boards) => 
  yup.object().shape({
    title: yup.string()
      .trim()
      .max(BOARD_TITLE_LENGTH_LIMIT, MAX_TITLE_LENGTH)
      .min(1, MIN_TITLE_LENGTH)
      .test(uniqueTitleTestCreator(boardId, boards))
      .required(REQUIRED_TITLE),
    columns: yup.number()
      .min(COLUMNS_MIN, COLUMNS_NUMBER)
      .max(COLUMNS_MAX, COLUMNS_NUMBER)
      .required(),
    autoSwitch: yup.boolean()
      .required(),
    switchInterval: yup.number()
      .when(
        'autoSwitch', {
          is: true,
          then: yup.number()
            .min(SWITCH_INTERVAL_MIN, MIN_SWITCH_INTERVAL)
            .required(),
          otherwise: yup.number()
            .notRequired()
        }
      )
  })
