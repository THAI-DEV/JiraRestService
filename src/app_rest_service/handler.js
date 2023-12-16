var _ = require('lodash');

var restSrv = require('../service/rest_service.js');
var util = require('../util/util.js');

function infoHandler(req, res) {
  res.send('Hello World!');
}

async function userAllHandler(req, res) {
  let inputData = await restSrv.getUserAll().then((data) => {
    return data;
  });

  let resultData = filterDataUserAll(inputData);
  resultData = util.pickField(resultData, ['displayName', 'accountId']);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(resultData));
}

async function projectAllHandler(req, res) {
  let inputData = await restSrv.getProjectAll().then((data) => {
    return data;
  });

  let resultData = filterDataProjectAll(inputData);
  resultData = util.pickField(resultData, ['id', 'key', 'name']);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(resultData));
}

async function genJqlHandler(req, res) {
  let jql = util.computeJql(req.body);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ jql: jql }));
}

function filterDataUserAll(inputData) {
  let resultData = _.filter(inputData, function (dataObj) {
    return dataObj.accountType === 'atlassian' && dataObj.active;
  });

  return resultData;
}

function filterDataProjectAll(inputData) {
  let resultData = _.filter(inputData, function (dataObj) {
    return dataObj.key !== 'EX';
  });

  return resultData;
}

module.exports = { infoHandler, userAllHandler, projectAllHandler, genJqlHandler };
