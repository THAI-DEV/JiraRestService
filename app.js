var _ = require('lodash');
const fs = require('fs');

main();

async function main() {
  console.log('-------------');

  await readJsonFile().then((data) => {
    resultData = _.filter(data, function (data) {
      return data.accountType === 'atlassian';
    });
    console.log(resultData);
  });

  console.log('=============');
}

// //   console.log(jsonData);

async function readJsonFile() {
  try {
    const data = await fs.promises.readFile('./data/data_user.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return null;
  }
}
