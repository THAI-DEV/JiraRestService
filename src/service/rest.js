var app_cont = require('./../cont/app_cont.js');

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
  var payload = {
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

module.exports = { getUserAll, getProjectAll, getIssueAll };
