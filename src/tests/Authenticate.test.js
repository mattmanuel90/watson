import React from 'react';
import ReactDOM from 'react-dom';
import { WATSON_API_AUTHENTICATED } from '../actions/authenticate';
import { authenticate } from '../reducers/authenticate';

describe('Authenticate reducer', () => {

  let state = {};

  beforeEach(() => {
    state = {authenticate: {hasAuthenticated: false, token: null}};  
  });

  it('should handle initial state', () => {
    expect(authenticate(undefined, {})).toEqual({
      hasAuthenticated: false,
      token: null
    });
  }); 

  it('authenticates', async () => {
    // expect(state.authenticate.hasAuthenticated).toEqual(false);
    const newState = await authenticate();
  });

});
