var _ = require('lodash');

var restSrv = require('../service/rest.js');
var util = require('../util/util.js');

async function issueAll(req, res) {
  let inputData = await restSrv.getIssueAll().then((data) => {
    return data;
  });

  let resultData = mapData(inputData);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(resultData));
}

function mapData(data) {
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

module.exports = { issueAll };
