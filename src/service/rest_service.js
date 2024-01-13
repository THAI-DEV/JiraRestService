var app_cont = require('../cont/app_cont.js');
var util = require('../util/util.js');

async function getUserAll() {
  let url = app_cont.REST_BASE_URL + '/users/search?startAt=0&maxResults=0';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: process.env.AUTHORIZATION,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  return result;
}

async function getProjectAll() {
  let url = app_cont.REST_BASE_URL + '/project?startAt=0&maxResults=0';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: process.env.AUTHORIZATION,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  return result;
}

async function postIssueTotal(data) {
  let url = app_cont.REST_BASE_URL + '/search';

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

async function postIssueAll(data) {
  const jqlStr = util.computeJql(data);

  const result = await findTotal(jqlStr);
  const total = result.total;

  let dataRetrieve = await retrieveData(jqlStr, total, data.pageNo, data.rowPerPage);

  let resultArr = [];
  dataRetrieve.forEach((item, index) => {
    let dataMap = mapData(item);

    dataMap.forEach((item2, index2) => {
      resultArr.push(item2);
    });
  });

  return resultArr;
}

async function postJqlTotal(data) {
  let url = app_cont.REST_BASE_URL + '/search';

  const jqlStr = data.jql;

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

async function postJqlAll(data) {
  const jqlStr = data.jql;

  const result = await findTotal(jqlStr);
  const total = result.total;

  let dataRetrieve = await retrieveData(jqlStr, total, data.pageNo, data.rowPerPage);

  let resultArr = [];
  dataRetrieve.forEach((item, index) => {
    let dataMap = mapData(item);

    dataMap.forEach((item2, index2) => {
      resultArr.push(item2);
    });
  });

  return resultArr;
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
      parentKey: 'none',
    };

    if (item.fields.parent) {
      resultObj.parentKey = item.fields.parent.key;
    }

    resultData.push(resultObj);
  });

  return resultData;
}

// function chkNull(data) {
//   if (data == null) {
//     return '';
//   } else {
//     return data;
//   }
// }

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
    console.log('ParentKey : ' + item.fields.parent.key);
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

    console.log('Parent Key : ' + item.parentKey);
  });
}

async function findTotal(jqlStr) {
  let url = app_cont.REST_BASE_URL + '/search';

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

  console.log(result);
  console.log('... Processing ...');

  return result;
}

async function retrieveData(jqlStr, total, pageNo, rowPerPage) {
  let url = app_cont.REST_BASE_URL + '/search';

  if (rowPerPage > 100 || rowPerPage <= 0) {
    rowPerPage = 100;
  }

  let pageInfoArr = util.calRowPerPage(total, rowPerPage);
  console.log('Calculated Page : ', pageInfoArr);

  if (pageNo < 0) {
    pageNo = 0;
  }

  if (pageNo > pageInfoArr.length) {
    pageNo = pageInfoArr.length;
  }

  if (pageNo >= 1) {
    let newPageInfoArr = [];
    newPageInfoArr.push(pageInfoArr[pageNo - 1]);
    pageInfoArr = newPageInfoArr;
  }

  console.log('Request Page : ', pageInfoArr);

  let resultList = [];

  for (let index = 0; index < pageInfoArr.length; index++) {
    const element = pageInfoArr[index];

    let pageList = element.split(',');

    let payload = {
      fields: ['status', 'created', 'updated', 'summary', 'assignee', 'reporter', 'project', 'parent'],
      jql: jqlStr,
      startAt: pageList[1],
      maxResults: rowPerPage,
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

  return resultList;
}

module.exports = { getUserAll, getProjectAll, postIssueTotal, postIssueAll, postJqlTotal, postJqlAll };
