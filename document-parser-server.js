console.clear();
var express = require('express');
var app = express();
var expressPath = require('express-path');
var cors = require('cors');
var bodyParser = require('body-parser');
var appRoutes = require('./routes/app-routes');

app.use(cors());

app.use(bodyParser.json({
    limit: '60mb'
}));
app.use(bodyParser.urlencoded({
    limit: '60mb',
    extended: true
}));
expressPath(app, appRoutes);

var port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("===============================================");
    console.log(`Document Parser Server running on port: ${port}`);
    console.log("================================================");
});