import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_IS_LOADING } from '../actions/fetchData'

export function fetchDataHasErrored(state = false, action) {
  switch(action.type) {
    case FETCH_DATA_ERROR:
      return action.hasErrored;
    default:
      return state;
  }
}

export function fetchDataIsLoading(state = false, action) {
  switch(action.type) {
    case FETCH_DATA_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export function fetchData(state = [], action) {
  switch(action.type) {
    case FETCH_DATA_SUCCESS:
      return action.data;
    default:
      return state;
  }
}