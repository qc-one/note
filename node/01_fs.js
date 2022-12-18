const fs = require('fs');

// fs.readFile('./file/123.txt', 'utf8', (err, res) => {
//     console.log(err);
//     console.log(res);
// })
// fs.readFile('./file/秦闯.jpg', 'utf8', (err, res) => {
//     console.log(err);
//     console.log(res);
// })

fs.writeFile('./file/2.xls', 'hello nodejs', (err) => {
    console.log(err);
})