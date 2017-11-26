import { combineReducers } from 'redux';
import { fetchData, fetchDataHasErrored } from './fetchData';
import { authenticate } from './authenticate';

export default combineReducers({
	fetchData,
	fetchDataHasErrored,
  authenticate
});