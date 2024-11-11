require('dotenv').config();

const _ = require('lodash');

const util = require('../util/util.js');
const restSrv = require('../service/rest_service.js');

main();

async function main() {
  console.log('---- Begin ----');

  let inputData;
  if (process.env.IS_USE_MOCK_DATA === 'YES') {
    //* Read data from File
    inputData = await util.readJsonFile('./data/data_project.json').then((data) => {
      return data;
    });
  } else {
    //* Read data from API
    inputData = await restSrv.getProjectAll().then((data) => {
      return data;
    });
  }

  let resultData = filterData(inputData);

  resultData = util.pickField(resultData, ['id', 'key', 'name']);

  console.log(resultData);
  console.log(resultData.length, inputData.length);

  if (process.env.IS_WRITE_OUTPUT_FILE === 'YES') {
    util.writeJsonFile('./output/result_project.json', resultData);
  }

  console.log('----  End  ----');
}

function filterData(inputData) {
  let resultData = _.filter(inputData, function (dataObj) {
    return dataObj.key !== 'EX';
  });

  return resultData;
}
