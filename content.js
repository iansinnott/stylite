console.log('INIT content script');

const fetchStyles = () => ({
  type: 'stylist/FETCH_STYLES',
});

const handleMessage = (request, sender, sendRequest) => {
  const { type, payload } = request;

  switch (type) {
  default:
    console.warn(`Content script just saw "${type}" passed in request`, request);
    return;
  }
};

// Set up listener to respond to any incoming messages
chrome.runtime.onMessage.addListener(handleMessage);

// initialize by fetching styles
chrome.runtime.sendMessage(fetchStyles(), handleMessage);
