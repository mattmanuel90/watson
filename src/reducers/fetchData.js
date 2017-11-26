import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_IS_LOADING, WATSON_API_AUTHENTICATED } from '../actions/fetchData'

const defaultState = {
  data: []
};

export function fetchDataHasErrored(state = defaultState, action) {
  switch(action.type) {
    case FETCH_DATA_ERROR:
      return action.hasErrored;
    default:
      return state;
  }
}

export function fetchDataHasAuthenticated(state = defaultState, action) {
  switch(action.type) {
    case WATSON_API_AUTHENTICATED:
      return {...state,
        hasAuthenticated: false
      };
    default:
      return state;
  }
}

export function fetchDataIsLoading(state = defaultState, action) {
  switch(action.type) {
    case FETCH_DATA_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

const updateEmotionScore = ( act, actTitle, sceneTitle, emotionData ) => {
  return {...act, scenes: act.scenes.map(scene => scene.scene == sceneTitle ? {...scene, score: emotionData} : scene) };
}

export function fetchData(state = defaultState, action) {
  switch(action.type) {
    case FETCH_DATA_SUCCESS:
      return {...state,
        acts: state.acts.map(act => action.act == act.act ? updateEmotionScore(act, action.act, action.scene, action.emotionData) : act)
      }
    default: 
      return state;
  }
}