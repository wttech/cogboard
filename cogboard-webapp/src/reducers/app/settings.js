import {
  path,
  findIndex,
  propEq,
  assoc,
  append,
  update,
  reject,
  mergeRight
} from 'ramda';

import {
  SAVE_SETTINGS,
  ADD_SETTINGS_ITEM,
  EDIT_SETTINGS_ITEM,
  DELETE_SETTINGS_ITEM
} from '../../actions/types';

const initState = {
  endpoints: [],
  credentials: []
};

const saveSettings = (state, payload) => mergeRight(state, payload);

const addSettingsItem = (state, { name, item }) =>
  assoc(name, append(item, path([name], state)), state);

const editSettingsItem = (state, { name, item }) =>
  assoc(
    name,
    update(
      findIndex(propEq('id', item.id))(path([name], state)),
      item,
      path([name], state)
    ),
    state
  );

const deleteSettingsItem = (state, { name, item }) =>
  assoc(name, reject(el => el.id === item.id, path([name], state)), state);

const settings = (state = initState, { type, payload }) => {
  switch (type) {
    case SAVE_SETTINGS:
      return saveSettings(state, payload);
    case ADD_SETTINGS_ITEM:
      return addSettingsItem(state, payload);
    case EDIT_SETTINGS_ITEM:
      return editSettingsItem(state, payload);
    case DELETE_SETTINGS_ITEM:
      return deleteSettingsItem(state, payload);
    default:
      return state;
  }
};

export default settings;
