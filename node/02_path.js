const fs = require('fs');
const path = require('path');
// console.log(path.join(__dirname, './file/3.xls')); // D:\studyEveryday\note\node\file\3.xls
// console.log(path.join('/a', '/b/c', '../', './d', 'e')); // \a\b\d\e

// fs.writeFile(path.join(__dirname, './file/3.xls'), 'hello nodejs', (err) => {
//     console.log(err);
// })

const Fpath = '/a/b/c/index.html';
console.log(path.basename(Fpath)); // index.html
console.log(path.basename(Fpath, '.html')); // index
console.log(path.extname(Fpath)); // .html