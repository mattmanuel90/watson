
import AuthorizationV1 from 'watson-developer-cloud/authorization/v1.js';
import NaturalLanguageUnderstandingV1 from 'watson-developer-cloud/natural-language-understanding/v1.js';

export const WATSON_API_AUTHENTICATED = 'WATSON_API_AUTHENTICATED';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_IS_LOADING = 'FETCH_DATA_IS_LOADING';

export function fetchDataError(bool) {
  return {
    type: FETCH_DATA_ERROR,
    hasErrored: bool
  }
}

export function fetchDataHasAuthenticated(bool) {
  return {
    type: WATSON_API_AUTHENTICATED,
    hasAuthenticated: bool
  }
}

export function fetchDataIsLoading(bool) {
  return {
    type: FETCH_DATA_IS_LOADING,
    isLoading: bool
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

  dispatch(fetchDataHasAuthenticated(false));
  dispatch(fetchDataIsLoading(true));

  let { paragraph, act, scene } = data;

  const fetchToken = () => {
    const ltAuthService = new AuthorizationV1({
      username: process.env.REACT_APP_WATSON_USERNAME || '<username>',
      password: process.env.REACT_APP_WATSON_PASSWORD || '<password>',
      url: "https://gateway.watsonplatform.net/natural-language-understanding/api"
    });
    return new Promise((resolve, reject) => {
      ltAuthService.getToken((err, token) => {
        if (err) {
          console.log('Error retrieving token: ', err);
          reject(err);
        }
        resolve(token);
      });
    });
  }

  //need text and token first
  const doRequest = (token = null) => {
    let service = new NaturalLanguageUnderstandingV1({
      username: process.env.REACT_APP_WATSON_USERNAME || '<username>',
      password: process.env.REACT_APP_WATSON_PASSWORD || '<password>',
      version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });

    console.log('afterwards');

    let parameters = {
      'text': paragraph,
      'features': {
        emotion: {}
      }
    }
    return new Promise((resolve, reject) => {
      service.analyze(parameters, (err, response) => {
        if (err) {
           console.log('error:', err);
          reject(dispatch(fetchDataError(true)));
        }
        else {
          console.log('finished loadddding');
          resolve(dispatch(fetchDataSuccess(response.emotion.document.emotion, act, scene)));
        }
      });
    });
  }

  // let token = await fetchToken();
  await doRequest();
	};
}