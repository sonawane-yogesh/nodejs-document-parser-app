var options = {
    type: "pdf"
};
var path = require('path');
var fs = require('fs');
var multiparty = require("multiparty");

const pdfExtractor = require("../adaptors/pdf-extractor");
const textExtractor = require("../adaptors/text-js-extractor");
const xlsxExtractor = require("../adaptors/xlsx-extractor");
const csvExtractor = require('../adaptors/csv-extractor');

var uploadToProcess = function (httpRequest, httpResponse) {
    var dirPath = path.join(__dirname, "../UploadedFiles");
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
    var form = new multiparty.Form({
        uploadDir: "./UploadedFiles"
    });
    form.on("part", function (part) {
        console.log(part.filename);
        httpResponse.send("Ok");
    });
    form.on("file", function (fileName, fileDetails) {
        var filePath = path.join(__dirname, "../", fileDetails.path);
        var newFile = path.join(__dirname, "../UploadedFiles", fileDetails.originalFilename);
        fs.renameSync(filePath, newFile);
        fileDetails.uploadedFileName = path.join("UploadedFiles", fileDetails.originalFilename);
        extractTextContent(fileName, fileDetails).then(result => {
            if (fs.existsSync(newFile)) fs.unlinkSync(newFile);
            httpResponse.json(result);
        }).catch(err => {
            httpResponse.status(500).json(err);
        });;
    });
    form.on("error", function (error) {
        console.log(error);
    });
    form.parse(httpRequest);
};

var extractTextContent = async function (fileName, fileDetails) {
    var regex = /(?:\.([^.]+))?$/;
    var extension = regex.exec(fileDetails.uploadedFileName)[1].toLowerCase();
    if (extension === "pdf") {
        return await pdfExtractor.extractPdf(fileDetails);
    }
    if (extension === 'txt') {
        return await textExtractor.extractText(fileDetails);
    }
    if (extension === "xls" || extension === "xlsx") {
        return await xlsxExtractor.extractXlsx(fileDetails);
    }
    if (extension === "csv") {
        return await csvExtractor.extractCsv(fileDetails);
    } else {
        return "Invalid Extension";
    }
};
module.exports = {
    extractTextContent,
    uploadToProcess
};