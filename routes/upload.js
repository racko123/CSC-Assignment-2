var express = require('express');
const path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/upload.html"));
});

module.exports = router;