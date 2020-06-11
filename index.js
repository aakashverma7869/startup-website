var express = require('express');
var app = express();
var passport  = require('passport')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs"); 
app.use(express.static(__dirname+"/public"));
var User = require('./models/user');
var flash = require("connect-flash");
var nodemailer = require('nodemailer')
var mailgun = require('nodemailer-mailgun-transport');


//Auth Implementation--------------------------------------------
var passport = require('passport');
var localStrategy = require("passport-local");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/startup",{ useUnifiedTopology: true,useNewUrlParser:true });


app.use(require("express-session")({
    secret:"Once Again I am Here!!",
    resave:false,
    saveUninitialized:false
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.current = req.User;
    next();
})

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.get('/',function(req,res){
    res.render('index');
});

app.get('/about',function(req,res){
    res.render('about');
})

app.get('/sign-up',isLoggedOut,function(req,res){
    res.render('sign-up');
})

app.post('/sign-up',isLoggedOut,function(req,res){
    var newUser = new User({ username:req.body.username,name:req.body.name});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('sign-up');
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            });
        }
    })
})

app.get('/login',isLoggedOut,function(req,res){
    res.render('login');
});

app.post('/login',isLoggedOut,passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'back'
}),function(req,res){
    //DO NOTHING

});


app.get('/logout',isLoggedIn,isLoggedIn,function(req,res){
    req.logOut();
    res.redirect('/');
})

//Contact Stuff==========================================================

console.log(process.env);
var auth  = {
    auth:{
        api_key:'API_KEY',
        domain:'DOMAIN'
    }
};

var transporter = nodemailer.createTransport(mailgun(auth));


app.get('/contact',isLoggedIn,function(req,res){
    res.render('contact');
})

app.post('/contact',function(req,res){

    var mailOptions = {
        from: req.body.email,
        to : '1ayushgoyal007@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log(err);
            console.log("error while sending email");
            res.redirect('back');
        }else{
            console.log('message sent');
            res.redirect('/');
        }
    });

})





app.get('*',function(req,res){
    res.render('default');
});




function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

function isLoggedOut(req,res,next){
    if(! req.isAuthenticated()){
        return next();
    }else{
        res.redirect('back');
    }
}


app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(req,res){
      console.log("Application running in port: " + app.get("port"));
});