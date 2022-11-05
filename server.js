if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

//Importing Libraries using npm
const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;


//user Schema implementation
mongoose 
 .connect('mongodb://127.0.0.1./dein_bahn_portal', {
        useNewUrlParser: true,
        useUnifiedTopology: true})   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

const UserSchema = mongoose.Schema({
    nachname: {
        type: String,
        required: true
    },
    vorname: {
        type: String,
        required: true
    },
    schullerID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require:true
    }   
});

const User = mongoose.model('User', UserSchema);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //We wont recive the sessions variable if nothing is changed
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
};
function isLoggedOut(req, res, next) {
    if(!req.isAuthenticated()) return next();
    res.redirect('/');
}

passport.use(new localStrategy(function(username, password, done){
    User.findOne({schullerID: schullerID}, function(err, user){
        if(err) {return done(err);}
        if(!user) {return done(null, false, {message: "Inncorrect SchullerID."}); }

        bcrypt.compare(password, user.password, function(err, res){
            if(err) return done(err);
            if(res === false) { return done(null, false, {message: "Inncorrect password."})};

            return done(null, user);
        });
    });
}));

//Configuring the login post functionallity

app.post('/login', passport.authenticate('local' , {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

//Configuring the register post functionallity
app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);//this hashed the pass
        const userName = req.body.name;
        const schullerID = req.body.schullerID;
        const password = req.body.password;

        //push register data to an array an save them if value is valid
        const newUser = await new User({
            nachname: req.body.name,
            vorname: req.body.vorname,
            schullerID: req.body.schullerID,
            password: hashedPassword 
        });

        newUser.save();

        console.log(newUser); //display users
        res.redirect('/login');
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
});


//Logout Function 
app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

//My Routes
app.get('/', isLoggedIn, (req, res) => {
    res.render('index.ejs');
});

app.get('/login', isLoggedOut, (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});
app.get('/uben', isLoggedIn, (req, res) => {
    res.render('uben.ejs');
})
//End Routes



app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
