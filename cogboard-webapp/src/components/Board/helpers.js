import { COLUMN_MULTIPLIER, DEFAULT_BOARD_TYPE } from '../../constants';
import boardTypes from '../boards';

export const getColumns = props => props.columns * COLUMN_MULTIPLIER;

export const getBoardConstructor = boardType => {
  return boardType
    ? boardTypes[boardType].component
    : boardTypes[DEFAULT_BOARD_TYPE].component;
};
