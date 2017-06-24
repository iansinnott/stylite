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

document.addEventListener('DOMContentLoaded', () => {
  const append = el => document.body.appendChild(el);
  setTimeout(() => {
    const subhead = document.createElement('h2');
    subhead.className = 'subhead';
    subhead.textContent = 'Subhead Loaded'
    append(subhead);

    getCurrentTab().then(tab => {
      const p = document.createElement('p');
      p.textContent = getHostname(tab.url);
      append(p);
    });
  }, 10);
});
