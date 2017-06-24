const FETCH_STYLES = 'stylist/FETCH_STYLES';

const handleMessage = (request, sender, sendRequest) => {
  const { type, payload } = request;

  switch (type) {
  case FETCH_STYLES:
    sendRequest({ styles: 'bleh' });
    return;
  default:
    console.warn(`Unsupported type "${type}" passed in request`);
    return;
  }
};

chrome.runtime.onMessage.addListener(handleMessage);
