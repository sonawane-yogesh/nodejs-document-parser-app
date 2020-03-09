var path = require('path');
var fs = require('fs');
var xlsx = require('node-xlsx');
exports.extractXlsx = (fileDetails) => new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    var text = xlsx.parse(fs.readFileSync(filePath));
    if (text === null) {
        reject("No Data");
    } else {
        resolve({
            ExtractedText:JSON.stringify(text)
        });
    }
});

