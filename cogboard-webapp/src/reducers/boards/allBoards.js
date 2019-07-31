import { RECEIVE_DATA } from '../../actions/types';

const receiveData = (state, { payload }) => {
  const { boards: { allBoards } } = payload;

  return [...state, ...allBoards];
};

const allBoards = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_DATA:
      return receiveData(state, action);
    default:
      return state;
  }
};

export default allBoards;