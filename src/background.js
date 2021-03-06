import {
  FETCH_STYLES,
  FETCH_STYLES_SUCCESS,
  UPDATE_STYLES_SUCCESS,
  FETCH_STATE,
  FETCH_STATE_SUCCESS,
  SAVE_STYLES,
  SAVE_STYLES_SUCCESS,
} from './action.js';
import {
  getCurrentTab,
  wrapStorage,
  prop,
  debug,
  intensifyCSS,
} from './utils.js';

const storage = wrapStorage(chrome.storage.sync);

const getStateById = (id) => {
  return storage.get(id)
    .then((result = {}) => result[id] || { id }); // Default to object with id
};

const getStyles = (state) => state.contentState || '';

/**
 * Transform an object with an id into a setter object for use with storage.set
 */
const toStorageSetter = (record) => ({ [record.id]: record });

/**
 * Take the first entry of an object. I use this when I end up with an object of
 * one element with an unknown key
 */
const firstEntry = obj => obj[Object.keys(obj)[0]];

const saveSuccess = (payload) => ({
  type: SAVE_STYLES_SUCCESS,
  payload,
});

// TODO: make this more generic
const pipe = (f, g) => (...args) => g(f(...args));

const stateToContentStyles = pipe(getStyles, intensifyCSS);

/**
 * NOTE: Return true for async. If you want async behavior you MUST return true,
 * otherwise chrome will invalided sendRequest and you will not get what you
 * want.
 */
const handleMessage = (request = {}, sender, sendRequest) => {
  const { type, payload } = request;

  switch (type) {
  case FETCH_STATE:
    Promise.resolve(payload) // Payload should be the id
      .then(getStateById)
      .then(state => sendRequest({
        type: FETCH_STATE_SUCCESS,
        payload: state,
      }));
    return true; // IMPORTANT! See NOTE
  case FETCH_STYLES:
    Promise.resolve(payload.id)
      .then(getStateById)
      .then(stateToContentStyles)
      .then(styles => sendRequest({
        type: FETCH_STYLES_SUCCESS,
        payload: { styles },
      }));
    return true; // IMPORTANT! See NOTE
  case SAVE_STYLES:
    Promise.resolve(payload)
      .then(toStorageSetter)
      .then(record =>
        storage.set(record).then(() => firstEntry(record)))
      .then(saveSuccess)
      .then(action => {
        return getCurrentTab()
          .then(prop('id'))
          .then(tabId => {
            debug('sending', action);
            chrome.tabs.sendMessage(tabId, {
              type: UPDATE_STYLES_SUCCESS,
              payload: { styles: stateToContentStyles(action.payload) },
            });
          });
      });
    return;
  default:
    debug(`Unsupported type "${type}" passed in request`);
    return;
  }
};

chrome.runtime.onMessage.addListener(handleMessage);

const handlePopupClosed = (port) => {
  debug('Popup Closing...', port);
};

const handlePopupConnect = port => {
  debug('Connected.', port);
  port.onDisconnect.addListener(handlePopupClosed);
};

chrome.runtime.onConnect.addListener(handlePopupConnect);
