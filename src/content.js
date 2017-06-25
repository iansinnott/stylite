import {
  fetchStyles,
  FETCH_STYLES_SUCCESS,
} from './action.js';

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

const handleMessage = (request = {}, sender, sendRequest) => {
  const { type, payload } = request;

  switch (type) {
  case FETCH_STYLES_SUCCESS:
    console.warn('Fetched styles. Applying...', request);
    applyStyles(payload.styles);
    return;
  default:
    console.warn(`Content script just saw "${type}" passed in request`, request);
    return;
  }
};

// Set up listener to respond to any incoming messages
chrome.runtime.onMessage.addListener(handleMessage);

// initialize by fetching styles
chrome.runtime.sendMessage(fetchStyles({ id: window.location.hostname }), handleMessage);
