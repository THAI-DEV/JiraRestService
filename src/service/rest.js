var app_cont = require('./../cont/app_cont.js');

async function getUserAll() {
  url = app_cont.REST_BASE_URL + '/users/search?startAt=0&maxResults=0';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: app_cont.AUTHORIZATION,
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
      Authorization: app_cont.AUTHORIZATION,
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  //   console.log(result);
  return result;
}

module.exports = { getUserAll, getProjectAll };
