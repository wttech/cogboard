import { WAITING_FOR_NEW_VERSION_DATA } from '../../actions/types';

const isWaitingForNewVersion = (state = false, { type, payload: data }) => {
  switch (type) {
    case WAITING_FOR_NEW_VERSION_DATA:
      return data;
    default:
      return state;
  }
};

export default isWaitingForNewVersion;
