// A tab is a plain object that provides information about the tab.
// See https://developer.chrome.com/extensions/tabs#type-Tab
//
// Current tab url is only available if the "activeTab" permission is declared.
// If you want to see the URL of other tabs (e.g. after removing active:true
// from |queryInfo|), then the "tabs" permission is required to see their
// "url" properties.
const getCurrentTab = () => {

  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var query = {
    active: true,
    currentWindow: true
  };

  return new Promise((resolve, reject) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    chrome.tabs.query(query, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

const getHostname = (url) => {
  return new URL(url).hostname;
};

const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
  fn(...args, (...result) => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
      return;
    }

    resolve(...result);
  });
});

const wrapStorage = (storage) => ({
  get: promisify(storage.get),
  set: promisify(storage.set),
});

const appendTo = target => el => target.appendChild(el);

const run = () => {
  const append = appendTo(document.body);
  const storage = wrapStorage(chrome.storage.sync);
  const normalizeId = (tab) => getHostname(tab.url); // Use host as id
  const getStateById = (id) => {
    return storage.get(id)
      .then((result = {}) => result[id] || { id }); // Default to object with id
  };
  const renderDOM = (state) => {
    const { id, contentState } = state;
    console.log('Loaded STATE:', state);

    const subhead = document.createElement('h2');
    subhead.className = 'subhead';
    subhead.textContent = `Found results for: ${id}`
    append(subhead);

    const editor = document.createElement('textarea');
    editor.placeholder = 'Styles...'
    editor.value = state.contentState || '';
    append(editor);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save'
    saveButton.onclick = () => {
      if (!editor.value) return; // Do nothing if no styles were saved
      storage.set({ [id]: { id, contentState: editor.value } })
        .then(x => console.log('saved', x), err => console.error('oh no', err))
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
