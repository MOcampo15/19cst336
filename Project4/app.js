var setRandomBgColor = require('@biffud/random-bg-color'); //added random background color generator npm package
const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));
//routes 
app.get("/", function(req,res) {
    res.render("index.html");
});

app.get("/index", function (req,res) {
    res.render("index.html");
});

app.get("/uses", function(req, res) {
    res.render("uses.html");
}); 

app.get("/history", function(req,res){
    res.render("history.html");
}); 

app.get("/careers", function(req,res){
    res.render("careers.html");
});

//server listener
app.listen("8081", "127.0.0.1", function() {
    console.log("Express Server is Running...");
});