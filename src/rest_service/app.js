var handler = require('./handler.js');
var handlerIssue = require('./handler_issue.js');

require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', handler.info);
app.get('/userAll', handler.userAll);
app.get('/projectAll', handler.projectAll);
app.get('/issueAll', handlerIssue.issueAll);

app.listen(process.env.PORT, () => {
  console.log(`Run listening on port ${process.env.PORT}`);
});
