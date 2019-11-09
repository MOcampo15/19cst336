const express = require("express");
const app = express();

//you can optionally use handlebars
app.set("view engine", "ejs");
app.use(express.static("public")); //access images, css, etc

//enable use of JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.get("/", function(req,res){
    
    res.render("index", {
        answers: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: "",
            q8: ""
        }
    });
    
    
});

//routes
app.post("/", function(req,res){
    
    res.json({"index" 
        answers: [
            {
                q1: "sacramento",
                q2: "mo",
                q3: "Jefferson && Roosevelt",
                q4: "rhode island",
                q5: "seal2",
                q6: "1861", 
                q7: "wa",
                q8: "flag1"
                
            }
        ],
        original: req.body
    })
});


//running server
app.listen(process.env.PORT || 3000, process.env.IP, function(){
    
    console.log("Express server is running...");
});