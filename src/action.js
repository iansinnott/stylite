export const FETCH_STYLES = 'stylite/FETCH_STYLES';
export const FETCH_STYLES_SUCCESS = 'stylite/FETCH_STYLES_SUCCESS';
export const FETCH_STYLES_FAILURE = 'stylite/FETCH_STYLES_FAILURE';

export const FETCH_STATE = 'stylite/FETCH_STATE';
export const FETCH_STATE_SUCCESS = 'stylite/FETCH_STATE_SUCCESS';
export const FETCH_STATE_FAILURE = 'stylite/FETCH_STATE_FAILURE';

export const SAVE_STYLES = 'stylite/SAVE_STYLES';
export const SAVE_STYLES_SUCCESS = 'stylite/SAVE_STYLES_SUCCESS';
export const SAVE_STYLES_FAILURE = 'stylite/SAVE_STYLES_FAILURE';

export const UPDATE_STYLES_SUCCESS = 'stylite/UPDATE_STYLES_SUCCESS';

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

