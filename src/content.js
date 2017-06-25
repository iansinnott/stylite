import {
  fetchStyles,
  FETCH_STYLES_SUCCESS,
  UPDATE_STYLES_SUCCESS,
} from './action.js';
import { promisify, debug } from './utils.js';

const sendRuntimeMessage = promisify(chrome.runtime.sendMessage);

const STYLE_TAG_SELECTOR='[data-stylite=true]';

const applyStyles = (styles) => {
  let styleTag = document.querySelector(STYLE_TAG_SELECTOR);
  if (styleTag) {
    styleTag.textContent = styles;
  } else {
    styleTag = document.createElement('style');
    styleTag.dataset.stylite = true;
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
  }
};

const handleMessage = (message = {}, sender, sendRequest) => {
  const { type, payload } = message;

  switch (type) {
  case UPDATE_STYLES_SUCCESS:
  case FETCH_STYLES_SUCCESS:
    debug('Applying styles...', message);
    applyStyles(payload.styles);
    return;
  default:
    debug(`Content script just saw "${type}" passed in message`, message);
    return;
  }
};

// Set up listener to respond to any incoming messages
chrome.runtime.onMessage.addListener(handleMessage);

// initialize by fetching styles
sendRuntimeMessage(fetchStyles({ id: window.location.hostname }))
  .then(handleMessage);
