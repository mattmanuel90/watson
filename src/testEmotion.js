
var watson = require('watson-developer-cloud');
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


const ltAuthService = new watson.AuthorizationV1({
  username: process.env.REACT_APP_WATSON_USERNAME || '<username>',
  password: process.env.REACT_APP_WATSON_PASSWORD || '<password>',
  url: "https://gateway.watsonplatform.net/natural-language-understanding/api"
});

const fetchToken = () => {
  return new Promise((resolve, reject) => {
    ltAuthService.getToken((err, token) => {
      if (err) {
        console.log('Error retrieving token: ', err);
        reject(err);
      }
      resolve(token);
      console.log(token);
    });
  })
}




//lets try authorisation
//https://console.bluemix.net/docs/services/watson/getting-started-tokens.html#tokens-for-authentication
//https://gateway.watsonplatform.net/authorization/api/v1/token
//https://gateway.watsonplatform.net/natural-language-understanding/api
//https://github.com/watson-developer-cloud/node-sdk
//https://developer.ibm.com/answers/questions/248133/access-to-the-personality-insight-api-via-regular.html


//this does the request directly of service using service credentials.

const doRequest = (text, token) => {
  let service = new NaturalLanguageUnderstandingV1({
    token: token,
    version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
  });

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

  let token = await fetchToken();
	let result = await doRequest(text, token);
  console.log(act);
  console.log(scene);
  console.log(text);
  console.log(result.emotion);
  return result;
}

for (const act of Object.keys(data)) {
  for( const scene of Object.keys(data[act])) {

    sceneText = data[act][scene].join(' ');
    // analyze((data[act][scene].join(' ')), act, scene);
  }
}

analyze(`The trumpets sound. Enter KING HENRY IV, PRINCE  HENRY, LORD JOHN LANCASTER, EARL OF WESTMORELAND, with WORCESTER and VERNON prisoners Thus ever did rebellion find rebuke. Ill-spirited Worcester! did not we send grace, Pardon and terms of love to all of you? And wouldst thou turn our offers contrary? Misuse the tenor of thy kinsman's trust? Three knights upon our party slain to-day, A noble earl and many a creature else Had been alive this hour, If like a Christian thou hadst truly borne Betwixt our armies true intelligence. What I have done my safety urged me to; And I embrace this fortune patiently, Since not to be avoided it falls on me. Bear Worcester to the death and Vernon too: Other offenders we will pause upon. Exeunt WORCESTER and VERNON, guarded How goes the field? The noble Scot, Lord Douglas, when he saw The fortune of the day quite turn'd from him, The noble Percy slain, and all his men Upon the foot of fear, fled with the rest; And falling from a hill, he was so bruised That the pursuers took him. At my tent The Douglas is; and I beseech your grace I may dispose of him. With all my heart. Then, brother John of Lancaster, to you This honourable bounty shall belong: Go to the Douglas, and deliver him Up to his pleasure, ransomless and free: His valour shown upon our crests to-day Hath taught us how to cherish such high deeds Even in the bosom of our adversaries. I thank your grace for this high courtesy, Which I shall give away immediately. Then this remains, that we divide our power. You, son John, and my cousin Westmoreland Towards York shall bend you with your dearest speed, To meet Northumberland and the prelate Scroop, Who, as we hear, are busily in arms: Myself and you, son Harry, will towards Wales, To fight with Glendower and the Earl of March. Rebellion in this land shall lose his sway, Meeting the cheque of such another day: And since this business so fair is done, Let us not leave till all our own be won. Exeunt`, 'Final', 'Act');



