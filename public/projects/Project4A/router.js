//var setRandomBgColor = require('@biffud/random-bg-color'); //added random background color generator npm package
const express = require("express");
const router = express.Router();

//routes 
router.get("/", function(req,res) {
    res.render("../public/projects/Project4A/views/index.html");
});

//routes 
router.get("/index", function(req,res) {
    res.render("../public/projects/Project4A/views/index.html");
});

router.get("/uses", function(req, res) {
    res.render("../public/projects/Project4A/views/uses.html");
}); 

router.get("/history", function(req,res){
    res.render("../public/projects/Project4A/views/history.html");
}); 

router.get("/careers", function(req,res){
    res.render("../public/projects/Project4A/views/careers.html");
});

module.exports = router;