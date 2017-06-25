import {
  appendTo,
  getHostname,
  getCurrentTab,
  storage,
  getStateById,
} from './utils.js';

const run = () => {
  const append = appendTo(document.body);
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
      if (!editor.value) return; // Do nothing if no styles were saved
      storage.set({ [id]: { id, contentState: editor.value } })
        .then(x => console.log('saved', x), err => console.error('oh no', err));
    };
    append(saveButton);
  };

  Promise.resolve()
    .then(getCurrentTab)
    .then(normalizeId)
    .then(getStateById)
    .then(renderDOM)
    .catch(err => {
      console.warn('Could not fetch storage');
      console.warn(err);
    });
};

// Run it
document.addEventListener('DOMContentLoaded', run);
