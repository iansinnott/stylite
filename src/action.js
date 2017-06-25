export const FETCH_STYLES = 'stylist/FETCH_STYLES';
export const FETCH_STYLES_SUCCESS = 'stylist/FETCH_STYLES_SUCCESS';
export const FETCH_STYLES_FAILURE = 'stylist/FETCH_STYLES_FAILURE';

export const fetchStyles = (payload) => ({
  type: FETCH_STYLES,
  payload,
});

