const INDEX_KEY = 'random-text-index';
const INDEX_DATE = 'random-text-date';
const INDEX_LAST_KEYS = 'random-last-keys';

export default {
  getIndex() {
    return window.localStorage.getItem(INDEX_KEY);
  },
  removeLastKeys() {
    window.localStorage.removeItem(INDEX_LAST_KEYS);
  },
  getLastKeys() {
    return JSON.parse(window.localStorage.getItem(INDEX_LAST_KEYS));
  },
  setLastKeys(arr) {
    window.localStorage.setItem(INDEX_LAST_KEYS, JSON.stringify(arr));
  },
  setIndex(index) {
    return window.localStorage.setItem(INDEX_KEY, index);
  },
  getDate() {
    return window.localStorage.getItem(INDEX_DATE);
  },
  setDate(date) {
    window.localStorage.setItem(INDEX_DATE, date);
  },
  removeDate() {
    window.localStorage.removeItem(INDEX_DATE);
  },
  shouldGenerateNextIndex() {
    let date = this.getDate();
    return date ? Date.now() > date : true;
  }
};
