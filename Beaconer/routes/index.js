var express = require('express');
var router = express.Router();
var beaconerConf = require('../lib/configuration');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express' , 
    searchServiceAddress:beaconerConf.getSearch()[0].url + '/search'
  });
});

module.exports = router;
