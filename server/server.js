'use strict';
const express = require('express'); // eslint-disable-line node/no-missing-require
const app = express();
const dotenv = require('dotenv');
const watson = require('watson-developer-cloud');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.load({ silent: true });

app.get('/api/token/', function(req, res) {
  const ltAuthService = new watson.AuthorizationV1({
    username: process.env.REACT_APP_WATSON_USERNAME || '<username>',
    password: process.env.REACT_APP_WATSON_PASSWORD || '<password>',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
  });
  ltAuthService.getToken(function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      return res.status(500).send('Error retrieving token');
    }
    res.send(token);
  });
});

app.post('/api/analyze', function(req,res) {

  const token = req.body.token;
  const text = req.body.text;

  console.log('analysing....');
  console.log(text);

  let service = new NaturalLanguageUnderstandingV1({
    token: token,
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
  });

  let parameters = {
    'text': text,
    'features': {
      'emotion': {}
    }
  }

  service.analyze(parameters, (err, response) => {
    if (err) {
      return res.status(500).send('Error analysing text');
    }
    else {
      res.send(response.emotion.document.emotion);
    }
  });
});

const port = 3001;
app.listen(port, function() {
  console.log('Watson server running at http://localhost:%s/', port);
});
