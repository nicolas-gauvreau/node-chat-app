// Jan 1st 1970 00:00:00 UTC
const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

var date = moment(125653453);
// date.add(1, 'year').subtract(9, 'months')
console.log(date.format('MMM Do, YYYY hh:mm:ss a'));

//10:35 am
var date = new moment();
console.log(date.format('h:mm a'));
