var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', //render is the indicator that I'm using a template engine...res.render relates back 
  { 
      title: 'Monica\'s Site'
  });
});

module.exports = router;
