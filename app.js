var express=require("express");
var app=express();
app.set('view engine','ejs');


app.get("/secret",function(){
    res.render("secret");
})
app.get("/",function(req,res){
    res.render("home");
});

app.listen("3000",function(){
    console.log("serving passport on port 3000");
})
