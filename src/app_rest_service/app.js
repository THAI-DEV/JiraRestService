const handler = require('./handler.js');
const handlerIssue = require('./handler_issue.js');
const handlerDemo = require('./handler_demo.js');

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('X-Powered-By', 'SENSE INFO TECH');
  next();
});

app.get('/', handler.infoHandler);
app.get('/userAll', handler.userAllHandler);
app.get('/projectAll', handler.projectAllHandler);

app.post('/genJql', handler.genJqlHandler);

app.post('/issueTotal', handlerIssue.issueTotalHandler);
app.post('/issueAll', handlerIssue.issueAllHandler);

app.post('/jqlTotal', handlerIssue.jqlTotalHandler);
app.post('/jqlAll', handlerIssue.jqlAllHandler);

app.get('/demo01', handlerDemo.demo01Handler);
app.post('/demo02', handlerDemo.demo02Handler);

app.listen(process.env.PORT, () => {
  console.log(`Run listening on port ${process.env.PORT}`);
});
