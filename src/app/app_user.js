require('dotenv').config();

var _ = require('lodash');

var util = require('./../util/util.js');
var restSrv = require('./../service/rest.js');

main();

async function main() {
  console.log('---- Begin ----');

  let inputData;
  if (process.env.IS_USE_MOCK_DATA === 'YES') {
    //* Read data from File
    inputData = await util.readJsonFile('./data/data_user.json').then((data) => {
      return data;
    });
  } else {
    //* Read data from API
    inputData = await restSrv.getUserAll().then((data) => {
      return data;
    });
  }

  let resultData = filterData(inputData);

  resultData = util.pickField(resultData, ['displayName', 'accountId']);

  console.log(resultData);
  console.log(resultData.length, inputData.length);

  if (process.env.IS_WRITE_OUTPUT_FILE === 'YES') {
    util.writeJsonFile('./output/result_user.json', resultData);
  }

  console.log('----  End  ----');
}

function filterData(inputData) {
  let resultData = _.filter(inputData, function (dataObj) {
    return dataObj.accountType === 'atlassian' && dataObj.active;
  });

  return resultData;
}
