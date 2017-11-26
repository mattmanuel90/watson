import { WATSON_API_AUTHENTICATED } from '../actions/authenticate';

const defaultState = {
  hasAuthenticated: false,
  token: null
};

export function authenticate(state = defaultState, action) {
  switch(action.type) {
    case WATSON_API_AUTHENTICATED:
      return {...state, hasAuthenticated: action.hasAuthenticated, token: action.token };
    default:
      return state;
  }
}