import {
  mergeRight,
  lensProp,
  lensIndex,
  set,
  view,
  reject,
  append,
  findIndex,
  propEq
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

const itemLens = name => lensProp(name);
const viewItem = (state, name) => view(itemLens(name), state);

const saveSettings = (state, payload) => mergeRight(state, payload);

const addSettingsItem = (state, { name, item }) =>
  set(itemLens(name), append(item, viewItem), state);

const editSettingsItem = (state, { name, item }) =>
  set(
    itemLens(name),
    set(lensIndex(findIndex(propEq('id', item.id))(viewItem)), item, viewItem),
    state
  );

const deleteSettingsItem = (state, { name, item }) =>
  set(itemLens(name), reject(el => el.id === item.id, viewItem), state);

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
