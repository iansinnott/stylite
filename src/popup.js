import {
  prop,
  appendTo,
  getHostname,
  getCurrentTab,
  promisify,
} from './utils.js';
import { saveStyles, fetchState } from './action.js';

const sendRuntimeMessage = promisify(chrome.runtime.sendMessage);

const run = () => {
  const append = appendTo(document.querySelector('#root'));
  const normalizeId = (tab) => getHostname(tab.url); // Use host as id
  const renderDOM = (state) => {
    const { id, contentState } = state;
    console.log('Loaded STATE:', state);

    const subhead = document.createElement('h2');
    subhead.className = 'subhead';
    subhead.textContent = `Found results for: ${id}`;
    append(subhead);

    const editor = document.createElement('textarea');
    editor.placeholder = 'Styles...';
    editor.value = contentState || '';
    append(editor);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => {
      sendRuntimeMessage(saveStyles({ id, contentState: editor.value }));
    };
    append(saveButton);
  };

  Promise.resolve()
    .then(getCurrentTab)
    .then(normalizeId)
    .then(id => sendRuntimeMessage(fetchState(id)))
    .then(prop('payload'))
    .then(renderDOM)
    .catch(err => {
      console.warn('Could not fetch storage');
      console.warn(err);
    });
};

// Run it
document.addEventListener('DOMContentLoaded', run);
