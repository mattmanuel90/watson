export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_IS_LOADING = 'FETCH_DATA_IS_LOADING';

export function fetchDataError(bool) {
  return {
    type: FETCH_DATA_ERROR,
    hasErrored: bool
  }
}

export function fetchDataSuccess(emotionData, act, scene) {
  return {
    type: FETCH_DATA_SUCCESS,
    emotionData,
    act,
    scene
  }
}

//redux thunk
export function fetchData(data) {
  return async (dispatch) => {
    let { paragraph, act, scene, token} = data;
    let paramData = {
      token: token,
      text: paragraph
    };
    fetch('/api/analyze', { 
      method: 'POST',
      body: JSON.stringify(paramData),
      headers: {"Content-Type": "application/json"}
    }).then(res => res.text()).then( data => {
      dispatch(fetchDataSuccess(JSON.parse(data), act, scene))
    }).catch(dispatch(fetchDataError(true)));
	};
}