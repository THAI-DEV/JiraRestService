var _ = require('lodash');
var util = require('./util.js');

main();

async function main() {
  console.log('---- Begin ----');

  const inputData = await util.readJsonFile('./data/data_user.json').then((data) => {
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
