import NaturalLanguageUnderstandingV1 from 'watson-developer-cloud/natural-language-understanding/v1.js';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_IS_LOADING = 'FETCH_DATA_IS_LOADING';

export function fetchDataError(bool) {
  return {
    type: FETCH_DATA_ERROR,
    hasErrored: bool
  }
}

export function fetchDataIsLoading(bool) {
  return {
    type: FETCH_DATA_IS_LOADING,
    isLoading: bool
  }
}

export function fetchDataSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data
  }
}

//redux thunk
export function fetchData(body) {

  return (dispatch) => {

    let service = new NaturalLanguageUnderstandingV1({
      username: process.env.REACT_APP_WATSON_USERNAME,
      password: process.env.REACT_APP_WATSON_PASSWORD,
      version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });

    let parameters = {
	    'text': body,
	    'features': {
	    	emotion: {}
	    }
  	}

    dispatch(fetchDataIsLoading(true));

    service.analyze(parameters, (err, response) => {
	    dispatch(fetchDataIsLoading(false));
	    if (err) {
	      console.log('error:', err);
	      dispatch(fetchDataError(true));
	    }
	    else {
	      console.log(response.emotion);
	      dispatch(fetchDataSuccess(response.emotion));
	    }
  	});
	};
}