var handler = require('./handler.js');
var handlerIssue = require('./handler_issue.js');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', handler.infoHandler);
app.get('/userAll', handler.userAllHandler);
app.get('/projectAll', handler.projectAllHandler);
app.get('/issueAll', handlerIssue.issueAllHandler);
app.get('/issueTotal', handlerIssue.issueTotalHandler);
app.post('/test', handlerIssue.testHandler);

app.listen(process.env.PORT, () => {
  console.log(`Run listening on port ${process.env.PORT}`);
});
