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

module.exports = { readJsonFile, pickField };
