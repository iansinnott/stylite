import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/css/css.js';

import {
  prop,
  appendTo,
  getHostname,
  getCurrentTab,
  promisify,
  debug,
} from './utils.js';
import { saveStyles, fetchState } from './action.js';

const sendRuntimeMessage = promisify(chrome.runtime.sendMessage);

// Editor options: https://codemirror.net/doc/manual.html#config
const editorOptions = {
  mode: 'css',
  lineNumbers: true,
  styleActiveLine: true,
  indentWithTabs: false,
  tabSize: 2,
  autofocus: true,
};

const run = () => {
  const append = appendTo(document.querySelector('#root'));
  const normalizeId = (tab) => getHostname(tab.url); // Use host as id
  const renderDOM = (state) => {
    debug('Loaded STATE:', state);
    const { id, contentState } = state;

    const subhead = document.createElement('h2');
    subhead.className = 'subhead';
    subhead.textContent = `${id}`;
    append(subhead);

    const textarea = document.createElement('textarea');
    const save = () => {
      editor.save(); // Copy codemirror data to textarea
      chrome.runtime.sendMessage(saveStyles({ id, contentState: textarea.value }));
    };
    textarea.placeholder = 'Styles...';
    textarea.value = contentState || '';
    append(textarea);
    const editor = CodeMirror.fromTextArea(textarea, editorOptions);

    // Save on blur. This is the main way to save. There is no save button.
    // However, cmd+enter will save as well without closing the modal.
    editor.on('blur', () => {
      debug('Blur save');
      save();
    });

    // Allow saving with cmd+enter
    editor.on('keydown', (_, e) => {
      if (e.which === 13 && e.metaKey) {
        debug('Manual save');
        e.preventDefault();
        save();
      }
    });

    const clearButton = document.createElement('button');
    clearButton.className = 'clearButton';
    clearButton.textContent = 'Clear';
    clearButton.onclick = () => {
      debug('Clearing...');
      editor.setValue('');
      save();
    };
    append(clearButton);
  };

  Promise.resolve()
    .then(getCurrentTab)
    .then(normalizeId)
    .then(id => sendRuntimeMessage(fetchState(id)))
    .then(prop('payload'))
    .then(renderDOM)
    .catch(err => debug('Error while rendering popup', err));
};

// Run it
document.addEventListener('DOMContentLoaded', run);

chrome.runtime.connect({ name: 'popup' });
