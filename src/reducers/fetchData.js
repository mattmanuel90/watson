import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from '../actions/fetchData'

const defaultState = {
  acts: []
};

export function fetchDataHasErrored(state = defaultState, action) {
  switch(action.type) {
    case FETCH_DATA_ERROR:
      return action.hasErrored;
    default:
      return state;
  }
}

const updateEmotionScore = ( act, actTitle, sceneTitle, emotionData ) => {
  return {...act, scenes: act.scenes.map(scene => scene.scene === sceneTitle ? {...scene, score: emotionData, loading: "finished"} : scene) };
}

export function fetchData(state = defaultState, action) {
  switch(action.type) {
    case FETCH_DATA_SUCCESS:
      return {...state,
        acts: state.acts.map(act => action.act === act.act ? updateEmotionScore(act, action.act, action.scene, action.emotionData) : act)
      }
    default: 
      return state;
  }
}