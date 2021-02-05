var clarifaiApiKey = 'ee72fbeb9aa946cf9ddcbc3f8ef0a2c2';
var workflowId = 'Face';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
