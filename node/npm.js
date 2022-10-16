const date = require('./dateFormat');
const moment = require('moment');

console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
console.log(date.dateFormat(new Date()));