
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'server/public')

app.listen(3030, function () {
    console.log('app is listening on port 3030...');
});

app.get("/", function (req, res) {
    res.render('/index.html');
});