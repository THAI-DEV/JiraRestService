var util = require('../util/util.js');

main();

function main() {
  const totalRows = 1017;
  const rowsPerPage = 100;

  arr = util.calRowPerPage(totalRows, rowsPerPage);
  console.table(arr);
}
