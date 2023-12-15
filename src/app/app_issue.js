require('dotenv').config();

var _ = require('lodash');

var util = require('../util/util.js');
var restSrv = require('../service/rest.js');

main();

async function main() {
  console.log('---- Begin ----');

  let inputData;
  if (process.env.IS_USE_MOCK_DATA === 'YES') {
    //* Read data from File
    inputData = await util.readJsonFile('./data/data_issue.json').then((data) => {
      return data.issues;
    });
  } else {
    //* Read data from API
    inputData = await restSrv.getProjectAll().then((data) => {
      return data;
    });
  }

  // console.log(inputData);

  // displayDetail(inputData);

  let resultData = mapData(inputData);

  // resultData = _.orderBy(resultData, ['updated'], ['desc']);

  // console.log(resultData);
  displayResultData(resultData);

  console.log(inputData.length);

  // let resultData = filterData(inputData);

  // resultData = util.pickField(resultData, ['id', 'key', 'name']);

  // console.log(resultData);
  // console.log(resultData.length, inputData.length);

  // if (process.env.IS_WRITE_OUTPUT_FILE === 'YES') {
  //   util.writeJsonFile('./output/result_project.json', resultData);
  // }

  console.log('----  End  ----');
}

function filterData(inputData) {
  let resultData = _.filter(inputData, function (dataObj) {
    return dataObj.key !== 'EX';
  });

  return resultData;
}

function displayInputData(data) {
  data.forEach((item, index) => {
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

function mapData(data) {
  let resultData = [];

  data.forEach((item, index) => {
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
