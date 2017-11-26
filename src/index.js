import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore.js';
import App from './components/App';
import playData from './henry_iv.json';
import registerServiceWorker from './registerServiceWorker';

export const initialiseData = () => {

  let state = {
    acts: [],
  }

  let data = [];
  let currentAct = "";
  let currentScene = "";

  for(let {text_entry} of playData) {
    if(text_entry.includes('ACT')) {
      data[text_entry] = {};
      currentAct = text_entry;
    } else if (text_entry.includes('SCENE')) {
      data[currentAct][text_entry] = [];
      currentScene = text_entry;
    } else {
      data[currentAct][currentScene].push(text_entry);
    }
  }

  let acts = [];
  for ( const actName of Object.keys(data) ) {
    let act = {
      act: actName,
      scenes: []
    }
    for ( const sceneName of Object.keys(data[actName]) ) {
      act.scenes.push({
        scene: sceneName,
        paragraph: data[actName][sceneName].join(' '),
        score: null,
        loading: 'queued'
      });
    }
    acts.push(act);
  }

  state.acts = acts;
  return state;
}

let defaultState = {
  fetchData: initialiseData(),
  authenticate: { hasAuthenticated: false, token: null }
};

const store = configureStore(defaultState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
