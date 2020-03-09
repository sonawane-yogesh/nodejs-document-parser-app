var path = require('path');
var csv = require('node-csv').createParser('\t', '"', '\\');
exports.extractCsv = (fileDetails) => new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    csv.parseFile(filePath, function (err, data) {
        if (err)
            reject(err);
        else {
            resolve({
                ExtractedText: JSON.stringify(text)
            });
        }
    });
});