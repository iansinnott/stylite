import { FETCH_STYLES, FETCH_STYLES_SUCCESS } from './action.js';
import { getStateById } from './utils.js';

const getStyles = (state) => state.contentState || '';

/**
 * NOTE: Return true for async. If you want async behavior you MUST return true,
 * otherwise chrome will invalided sendRequest and you will not get what you
 * want.
 */
const handleMessage = (request = {}, sender, sendRequest) => {
  const { type, payload } = request;

  switch (type) {
  case FETCH_STYLES:
    Promise.resolve(payload.id)
      .then(getStateById)
      .then(getStyles)
      .then(styles => sendRequest({
        type: FETCH_STYLES_SUCCESS,
        payload: { styles },
      }));
    return true; // IMPORTANT! See NOTE
  default:
    console.warn(`Unsupported type "${type}" passed in request`);
    return;
  }
};

chrome.runtime.onMessage.addListener(handleMessage);
