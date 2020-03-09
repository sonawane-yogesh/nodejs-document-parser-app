var fs = require('fs');
var path = require('path');
var pdf = require('pdf-parse');

exports.extractPdf = (fileDetails) => new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    var dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then((result) => {
        resolve({
            ExtractedText: JSON.stringify(result.text)
        });
    }).catch((error) => {
        reject(error);
    });
});