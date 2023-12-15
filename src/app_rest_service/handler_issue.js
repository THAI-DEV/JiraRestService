var _ = require('lodash');

var restSrv = require('../service/rest_service.js');
var util = require('../util/util.js');

async function issueAllHandler(req, res) {
  let inputData = await restSrv.getIssueAll().then((data) => {
    return data;
  });

  let resultData = mapDataIssueAll(inputData);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(resultData));
}

async function issueTotalHandler(req, res) {
  let inputData = await restSrv.getIssueTotal().then((data) => {
    return data;
  });

  let resultData = mapDataIssueTotal(inputData);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(resultData));
}

function mapDataIssueAll(data) {
  let resultData = [];

  data.issues.forEach((item, index) => {
    let resultObj = {
      key: item.key,
      summary: item.fields.summary,
      status: item.fields.status.name,
      created: item.fields.created,
      updated: item.fields.updated,
      assignee: item.fields.assignee.displayName,
      reporter: item.fields.reporter.displayName,
      projectKey: item.fields.project.key,
      projectName: item.fields.project.name,
    };

    resultData.push(resultObj);
  });

  return resultData;
}

function mapDataIssueTotal(data) {
  let resultData = {
    total: data.total,
  };

  return resultData;
}

module.exports = { issueAllHandler, issueTotalHandler };
