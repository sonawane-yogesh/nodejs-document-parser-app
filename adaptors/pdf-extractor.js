var fs = require('fs');
var path = require('path');
var pdf = require('pdf-parse');

exports.extractPdf = async function (fileDetails) {
    return await extract(fileDetails);
    /*
    var filePath = path.join(dirPath, "../UploadedScripts/2. TFN Information packet.pdf");
    var dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then((result) => {
        response.send(result);
        console.log(result);
    }).catch((error) => {
        response.status(500).send(error);
        console.log(error);
    });
    */
};

var extract = (fileDetails) => new Promise((resolve, reject) => {
    var filePath = path.join(__dirname, "../", fileDetails.uploadedFileName);
    var dataBuffer = fs.readFileSync(filePath);
    pdf(dataBuffer).then((result) => {
        resolve(result);
    }).catch((error) => {
        reject(error);
    });
});