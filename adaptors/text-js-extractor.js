var fs = require('fs');
var path = require('path');

exports.extractText = (fileDetails) => new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve( {
                ExtractedText: JSON.stringify(data)
            });
        }
    });
});