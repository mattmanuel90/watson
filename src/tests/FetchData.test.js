import React from 'react';
import ReactDOM from 'react-dom';
import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../actions/fetchData';
import { fetchData } from '../reducers/fetchData';

describe('Fetch data reducer', () => {

  let state = {};

  beforeEach(() => {
    state = { acts: []};  
  });

  it('should handle initial state', () => {
    expect(fetchData(undefined, {})).toEqual({
      acts: []
    });
  }); 
  
});
