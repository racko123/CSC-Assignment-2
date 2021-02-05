var express = require('express');
const path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join('D:/Poly Stuff/Cloud Stuff/CSC Assignment 2/public/Image-Recog.html'));
});

module.exports = router;