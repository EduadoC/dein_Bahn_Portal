if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

//Importing Libraries using npm
const express = require('express');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializelizePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');

const users = []

initializelizePassport(
    passport,
    schullerID => users.find(user => user.schullerID === schullerID), //searched user on array
    id => users.find(user => user.id === id)
);

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
        //push register data to an array an save them
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            schullerID: req.body.schullerID,
            password: hashedPassword,
        })
        console.log(users); //display users
        res.redirect('/login')
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
