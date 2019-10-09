var path = require('path');
var fs = require('fs');
var xlsx = require('node-xlsx');
exports.extractXlsx = (fileDetails) => new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    var data = xlsx.parse(fs.readFileSync(filePath));
    if (data === null)
        reject("No Data");
    else
        resolve(data);
});