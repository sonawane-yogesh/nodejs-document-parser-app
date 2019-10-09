var path = require('path');
var csv = require('node-csv').createParser('\t', '"', '\\');
exports.extractCsv = (fileDetails) => new Promise((resove, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    csv.parseFile(filePath, function (err, data) {
        if (err)
            reject(err);
        else
            resolve(data);
    });
});