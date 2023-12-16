var _ = require('lodash');
var app_cont = require('../cont/app_cont.js');
var util = require('../util/util.js');

async function getUserAll() {
  url = app_cont.REST_BASE_URL + '/users/search?startAt=0&maxResults=0';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: process.env.AUTHORIZATION,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  //   console.log(result);
  return result;
}

async function getProjectAll() {
  url = app_cont.REST_BASE_URL + '/project?startAt=0&maxResults=0';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: process.env.AUTHORIZATION,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  //   console.log(result);
  return result;
}

async function getIssueAll() {
  url = app_cont.REST_BASE_URL + '/search';

  //'assignee in (712020:e0c1f4d1-f728-4fa1-aec0-5d3b4ecff8ba) AND project = SENSE-TEAM_IT AND  updated >= 2023-11-01 AND updated <= 2023-12-31 order by updated DESC'
  let payload = {
    fields: ['status', 'created', 'updated', 'summary', 'assignee', 'reporter', 'project'],
    fieldsByKeys: false,
    jql: 'project = SENSE-TEAM_IT AND  updated >= 2023-11-01 AND updated <= 2023-12-31 order by updated DESC',
    startAt: 0,
    maxResults: 100,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: process.env.AUTHORIZATION,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  // console.log(result);
  return result;
}

async function postIssueTotal(data) {
  url = app_cont.REST_BASE_URL + '/search';

  const jqlStr = util.computeJql(data);

  let payload = {
    jql: jqlStr,
    maxResults: 0,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: process.env.AUTHORIZATION,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();

  return result;
}

async function postTest(data) {
  url = app_cont.REST_BASE_URL + '/search';

  const jqlStr = util.computeJql(data);

  const result = await findTotal(jqlStr);
  const total = result.total;

  let aa = await retrieveData(jqlStr, total);

  let xx = [];
  aa.forEach((item, index) => {
    // console.log(item);
    let bb = mapData(item);

    bb.forEach((item2, index2) => {
      xx.push(item2);
    });
  });

  //TODO wwwwwwwwwwwwwww

  // console.log(xx);

  return xx;
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
      assignee: item.fields.assignee?.displayName,
      reporter: item.fields.reporter?.displayName,
      projectKey: item.fields.project.key,
      projectName: item.fields.project.name,
    };

    resultData.push(resultObj);
  });

  // displayResultData(resultData);

  return resultData;
}

function chkNull(data) {
  if (data == null) {
    return '';
  } else {
    return data;
  }
}

function displayInputData(data) {
  data.issues.forEach((item, index) => {
    console.log('------------------------------------');
    console.log('Row : ' + (index + 1));
    console.log('Key : ' + item.key);
    console.log('Summary : ', item.fields.summary);
    console.log('Status :' + item.fields.status.name);
    console.log('Created : ' + item.fields.created);
    console.log('Updated : ' + item.fields.updated);
    console.log('Assignee : ' + item.fields.assignee.displayName);
    console.log('Reporter : ' + item.fields.reporter.displayName);
    console.log('Project : ' + item.fields.project.key + ' = ' + item.fields.project.name);
  });
}

function displayResultData(data) {
  data.forEach((item, index) => {
    console.log('------------------------------------');
    console.log('Row : ' + (index + 1));

    console.log('Project Key : ' + item.projectKey);
    console.log('project Name : ' + item.projectName);

    console.log('Key : ' + item.key);
    console.log('Summary : ', item.summary);
    console.log('Status :' + item.status);

    console.log('Created : ' + item.created);
    console.log('Updated : ' + item.updated);

    console.log('Assignee : ' + item.assignee);
    console.log('Reporter : ' + item.reporter);
  });
}

async function findTotal(jqlStr) {
  //find total
  let payload = {
    jql: jqlStr,
    maxResults: 0,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: process.env.AUTHORIZATION,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  //TODO yyyyyy

  console.log(result);

  return result;
}

async function retrieveData(jqlStr, total) {
  let pageTable = util.calRowPerPage(total, app_cont.ROW_PER_PAGE);
  console.log(pageTable);

  let resultList = [];

  for (let index = 0; index < pageTable.length; index++) {
    const element = pageTable[index];

    let arrList = element.split(',');

    let payload = {
      fields: ['status', 'created', 'updated', 'summary', 'assignee', 'reporter', 'project'],
      jql: jqlStr,
      startAt: arrList[1],
      maxResults: app_cont.ROW_PER_PAGE,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: process.env.AUTHORIZATION,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    resultList.push(result);
  }

  //TODO zzzzzz

  return resultList;
}

module.exports = { getUserAll, getProjectAll, getIssueAll, postIssueTotal, postTest };
