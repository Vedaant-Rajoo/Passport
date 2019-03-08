var express               =require("express"),
    mongoose              =require("mongoose"),
    passport              =require("passport"),
    User                  =require("./models/user"),
    LocalStrategy         =require("passport-local"),
    bodyParser            =require("body-parser"),
    app                   =express(),
    passportLocalMongoose =require("passport-local-mongoose");

mongoose.connect("mongodb+srv://Vedaant:vedaant123@cluster0-yunv0.mongodb.net/test?retryWrites=true");
app.use(require("express-session")({
    secret:"Rusty is the cutest",
    resave:false,
    saveUninitialized: false,
    
}));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

///================
///   ROUTES
///================

app.get("/secret",isLoggedIn ,function(req,res){
    res.render("secret");
});
app.get("/",function(req,res){
    res.render("home");
});

///AUTH ROUTES

//show sign up form
app.get("/register",function(req,res){
    res.render("register");
});
//user sign up
app.post("/register", function(req,res){
    /* req.body.username
    req.body.password */
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");

        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    });
});


///Login forms

app.get("/login",function(req,res){
    res.render("login");
});


//login login

//middleware
app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),
    function(req,res){


});


app.get("/logout",function(req,res){
    req.logout();    ///destroying user session
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();

    }
    res.redirect("/login");

}
var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log("Serving passport on port",port);
});
