export const WATSON_API_AUTHENTICATED = 'WATSON_API_AUTHENTICATED';


export function fetchDataHasAuthenticated(bool, token = null) {
  return {
    type: WATSON_API_AUTHENTICATED,
    hasAuthenticated: bool,
    token
  }
}

export function authenticate() {
  return (dispatch) => {
    dispatch(fetchDataHasAuthenticated(false));

   return fetch('/api/token')
    .then(res => res.text())
    .then(token => dispatch(fetchDataHasAuthenticated(true, token)));
  };
}