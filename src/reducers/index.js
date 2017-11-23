import { combineReducers } from 'redux';
import { fetchData, fetchDataIsLoading, fetchDataHasErrored } from './fetchData';
export default combineReducers({
	fetchData,
	fetchDataIsLoading,
	fetchDataHasErrored
});