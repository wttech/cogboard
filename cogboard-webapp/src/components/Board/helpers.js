import { COLUMN_MULTIPLIER, DEFAULT_BOARD_TYPE } from '../../constants';
import boardTypesConfig from '../boards/config';

export const getColumns = props => props.columns * COLUMN_MULTIPLIER;

export const getBoardConstructor = boardType => {
  return boardType
    ? boardTypesConfig[boardType].component
    : boardTypesConfig[DEFAULT_BOARD_TYPE].component;
};
