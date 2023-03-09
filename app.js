const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Products = require('./products');

const app = express();

const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.use(session({
    secret: "magic-finger-braids-secret-access-key-by-donald-237-03-03-2023",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect("mongodb://localhost:27017/shopDB");

app.get('/', (req, res) => res.render("home", {featuredProducts: Products}));
app.get('/shop', (req, res) => res.render("shop", {products: Products}));
app.listen(port, () => console.log(`app listening on port ${port}!`))