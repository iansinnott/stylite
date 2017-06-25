export const FETCH_STYLES = 'stylist/FETCH_STYLES';
export const FETCH_STYLES_SUCCESS = 'stylist/FETCH_STYLES_SUCCESS';
export const FETCH_STYLES_FAILURE = 'stylist/FETCH_STYLES_FAILURE';

export const FETCH_STATE = 'stylist/FETCH_STATE';
export const FETCH_STATE_SUCCESS = 'stylist/FETCH_STATE_SUCCESS';
export const FETCH_STATE_FAILURE = 'stylist/FETCH_STATE_FAILURE';

export const SAVE_STYLES = 'stylist/SAVE_STYLES';
export const SAVE_STYLES_SUCCESS = 'stylist/SAVE_STYLES_SUCCESS';
export const SAVE_STYLES_FAILURE = 'stylist/SAVE_STYLES_FAILURE';

export const fetchState = (id) => ({
  type: FETCH_STATE,
  payload: id,
});

export const fetchStyles = (payload) => ({
  type: FETCH_STYLES,
  payload,
});

export const saveStyles = (payload) => ({
  type: SAVE_STYLES,
  payload,
});

