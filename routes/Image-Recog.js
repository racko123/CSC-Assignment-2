var express = require('express');
var app = express();

app.get('/', function(req, res) {
    app.use(express.static(path.join(__dirname, 'public')));
});


module.exports = app;