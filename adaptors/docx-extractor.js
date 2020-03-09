var path = require('path');
var textract = require('textract');

exports.extractDocx = async (fileDetails) => new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    textract.fromFileWithPath(filePath, function (error, text) {
        if (error)
            reject(error);
        else
            resolve({
                ExtractedText: JSON.stringify(text)
            });
    });
});