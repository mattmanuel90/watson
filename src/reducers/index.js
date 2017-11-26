import { combineReducers } from 'redux';
import { fetchData, fetchDataIsLoading, fetchDataHasErrored, fetchDataHasAuthenticated } from './fetchData';
export default combineReducers({
	fetchData,
	fetchDataIsLoading,
	fetchDataHasErrored,
  fetchDataHasAuthenticated
});