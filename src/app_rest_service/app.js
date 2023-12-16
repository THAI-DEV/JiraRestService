var handler = require('./handler.js');
var handlerIssue = require('./handler_issue.js');

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

app.listen(process.env.PORT, () => {
  console.log(`Run listening on port ${process.env.PORT}`);
});
