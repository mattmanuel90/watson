This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

To run:
`yarn start`

Add a .env file in the root folder and these environment variables `REACT_APP_WATSON_USERNAME` and `REACT_APP_WATSON_PASSWORD`.

Test Watson:
Run `node src/testEmotion.js` to test the watson service on the given data.

Todo:
- Use server proxy to call Watson service.
https://developer.ibm.com/answers/questions/375745/401-error-in-watson-natural-language-understanding.html
- Tests
- Graph visualisation of data using visualisation library (d3.js)
