import moment from 'moment';
import keys from './keys';

var token = keys.sugarBits.token;
var userId = keys.fitBits.user_id;
var bearerToken = keys.fitBits.bearerToken;

var api = {
  // get data from the ManageBGL API
  getGlucose() {
    var url = `https://managebgl-managebgl.p.mashape.com/extract?end_date=2017-11-05+11%3A59%3A59&start_date=2017-10-25+14%3A03%3A00&token=${token}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        "X-Mashape-Key": "6jSePifxX0mshxd2XWBWPbHlepblp1Xtffhjsnsd7sZZyeYkRa",
        "Accept": "application/json"
      }
    })
    .then((res) => res.json());
  },
  // add a reading to the ManageBGL API
  addGlucose(inputMgDl) {
    let glucoseReading = inputMgDl / 18; // convert back to mmol from mg/dL TODO: truncate down to two decimal points
    // use string literals to add the token and glucose reading
    // time field left blank will default to current time
    let url = `https://managebgl-managebgl.p.mashape.com/add?log_type=1&notes=test+value&other=<required>&time=&token=${token}&value=${glucoseReading}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        "X-Mashape-Key": "hwasdSqeo9mshO0x2M0peVtVVa7bp1Kb71AjsnHUsEeYyoMz35",
        "Accept": "application/json"
      }
      .then((res) => res.json())
    }
  )},
  delGlucose(log_id) {
    let url = `https://www.PredictBGL.com/api/1.0/delete?token=${token}&log_id=${log_id}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        "Accept": "application/json"
      }
      .then((res) => res.json())
    })
  },
  updGlucose(log_id, value, notes) {
    let url = `https://www.PredictBGL.com/api/1.0/update?token=${token}&$log_id=${log_id}&value=${value}&notes=${notes}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        "Accept": "application/json"
      }
      .then((res) => res.json())  
    })  
  },
  getSteps() {
    let url = `https://api.fitbit.com/1/user/${userId}/activities/date/2017-11-01.json`;
    return fetch(url, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${bearerToken}`
      }
    })
    .then((res) => res.json());
  }
};

module.exports = api;