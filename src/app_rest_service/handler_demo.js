const { update } = require('lodash');

function demo01Handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const result = {
    name: 'Demo01',
    access: currentDateTime(),
  };
  res.end(JSON.stringify(result));
}

function demo02Handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const result = {
    name: 'Demo02',
    random: randomString(8),
    access: currentDateTime(),
  };
  res.end(JSON.stringify(result));
}

module.exports = { demo01Handler, demo02Handler };

function currentDateTime() {
  const date = new Date();
  return date.toLocaleString('en-US', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hour12: false,
  });
}

function randomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
