var restSrv = require('../service/rest_service.js');

async function issueTotalHandler(req, res) {
  let inputData = await restSrv.postIssueTotal(req.body).then((data) => {
    return data;
  });

  let resultData = mapDataIssueTotal(inputData);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(resultData));
}

async function issueAllHandler(req, res) {
  let result = await restSrv.postIssueAll(req.body);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
  console.log('... Done ...');
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

module.exports = { issueTotalHandler, issueAllHandler };
