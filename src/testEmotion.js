var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var playData =  require('./henry_iv.json');

var dotenv = require('dotenv');
dotenv.config();

const importData = () => {
  let data = {};
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
  return data;
}

let data = importData();
// console.log(importData());

let service = new NaturalLanguageUnderstandingV1({
  username: process.env.REACT_APP_WATSON_USERNAME,
  password: process.env.REACT_APP_WATSON_PASSWORD,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});

const doRequest = (text) => {
  let parameters = {
    'text': text,
    'features': {
      emotion: {}
    }
  }
  return new Promise((resolve, reject) => {
    service.analyze(parameters, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        resolve(response);
      }
    });
    }
  );
}

const analyze = async (text, act, scene) => {
	let result = await doRequest(text);
  console.log(act);
  console.log(scene);
  console.log(result.emotion);
  return result;
}

for (const act of Object.keys(data)) {
  for( const scene of Object.keys(data[act])) {
    analyze((data[act][scene].join(' ')), act, scene);
  }
}

