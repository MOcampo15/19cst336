const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));
//routes 
app.get("/", function(req,res) {
    res.send("index.html");
});

app.get("/mercury", function(req, res) {
    res.send("This will be the Mercury web page!");
});

app.get("/venus", function(req,res){
    res.send("This will be the Venus web page!");
}); 

//server listener
app.listen("8081", "127.0.0.1", function() {
    console.log("Express Server is Running...");
});