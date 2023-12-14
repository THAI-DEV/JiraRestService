var _ = require('lodash');
var util = require('./../util/util.js');
var restSrv = require('./../service/rest.js');

main();

async function main() {
  console.log('---- Begin ----');

  //* Read data from File
  // const inputData = await util.readJsonFile('./data/data_user.json').then((data) => {
  //   return data;
  // });

  //* Read data from API
  const inputData = await restSrv.getUserAll().then((data) => {
    return data;
  });

  let resultData = filterData(inputData);

  resultData = util.pickField(resultData, ['displayName', 'accountId']);

  console.log(resultData);
  console.log(resultData.length, inputData.length);

  console.log('----  End  ----');
}

// //   console.log(jsonData);

function filterData(inputData) {
  let resultData = _.filter(inputData, function (dataObj) {
    return dataObj.accountType === 'atlassian' && dataObj.active;
  });

  return resultData;
}
