const fs = require('fs');
var _ = require('lodash');

async function readJsonFile(fileSource) {
  try {
    const data = await fs.promises.readFile(fileSource, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return null;
  }
}

function pickField(data, arrField) {
  let result = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const newElement = _.pick(element, arrField);

    result.push(newElement);
  }

  return result;
}

function writeJsonFile(fileSource, data) {
  try {
    fs.writeFileSync(fileSource, JSON.stringify(data, null, 2), 'utf8');
    console.log('File written successfully');
  } catch (err) {
    console.error(err);
  }
}

function calRowPerPage(totalRows, rowsPerPage) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  //   console.log(`Number of rows per page: ${rowsPerPage}`);
  //   console.log(`Total number of pages: ${totalPages}`);
  //   console.log();

  let startNo = 0;
  let result = [];
  for (let index = 0; index < totalPages; index++) {
    const pageNo = index + 1;
    let stopNo = startNo + rowsPerPage - 1;
    if (stopNo >= totalRows) {
      stopNo = totalRows - 1;
    }

    result.push(pageNo + ',' + startNo + ',' + stopNo);
    // console.log(`Page ${pageNo}: ${startNo} - ${stopNo}`);

    startNo = startNo + rowsPerPage;
  }

  return result;
}

function computeJql(data) {
  let jql = '';
  let oper = ' AND';

  if (data.operater !== undefined) {
    oper = ' ' + data.operater;
  }

  jql = '(' + jql;

  if (data.assignee !== undefined) {
    jql = jql + 'assignee in (' + data.assignee + ')';
  }

  if (data.reporter !== undefined) {
    jql = jql + oper + ' reporter in (' + data.reporter + ')';
  }

  jql = jql + ')';

  if (data.project !== undefined) {
    jql = jql + ' AND project = ' + data.project;
  }

  if (data.beginDate !== undefined) {
    jql = jql + ' AND updated >= ' + data.beginDate;
  }

  if (data.endDate !== undefined) {
    jql = jql + ' AND updated <= ' + data.endDate;
  }

  jql = jql + ' order by updated DESC';

  jql = jql.trim();

  if (jql.indexOf('AND') === 0) {
    jql = jql.replace('AND', '');
  }

  jql = jql.trim();

  if (jql.indexOf('( AND') === 0) {
    jql = jql.replace('( AND', '(');
  }

  jql = jql.trim();

  if (jql.indexOf('OR') === 0) {
    jql = jql.replace('OR', '');
  }

  jql = jql.trim();

  if (jql.indexOf('( OR') === 0) {
    jql = jql.replace('( OR', '(');
  }

  jql = jql.trim();

  if (jql.indexOf('()') === 0) {
    jql = jql.replace('()', '');
  }

  jql = jql.trim();

  if (jql.indexOf('AND') === 0) {
    jql = jql.replace('AND', '');
  }

  jql = jql.trim();

  if (jql.indexOf('OR') === 0) {
    jql = jql.replace('OR', '');
  }

  jql = jql.trim();

  console.log(jql);

  return jql;
}

module.exports = { readJsonFile, pickField, writeJsonFile, calRowPerPage, computeJql };
