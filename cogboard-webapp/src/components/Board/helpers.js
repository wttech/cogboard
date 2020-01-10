import { COLUMN_MULTIPLIER, DEFAULT_BOARD_TYPE } from '../../constants';
import boardTypes from '../boards';

export const getColumns = props => props.columns * COLUMN_MULTIPLIER;

export const getBoardType = currentBoard => {
  return currentBoard.type
    ? boardTypes[currentBoard.type].component
    : boardTypes[DEFAULT_BOARD_TYPE].component;
};
