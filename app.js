const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Products = require('./products');

const app = express();

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/magicDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static("public"));
app.use(express.json());
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

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    image: String,
    options: Array,
    min: Number,
    max: Number,
})

const Product = mongoose.model('product', productSchema);

// Products.forEach(product => {
//     const newProduct = new Product({
//         name: product.name,
//         type: product.type,
//         image: product.image,
//         options: product.options,
//         min: product.min,
//         max: product.max,
//     });

//     newProduct.save();
// })

app.post('/product', async (req, res) => {
    const product = await Product.findById(req.body.id);
    res.send(product);
});

app.get('/', (req, res) => {
    res.render("home", {featuredProducts: Products})
});
    
app.get('/shop', async (req, res) => {
    const products = await Product.find();
    res.render("shop", {products});
});
app.get('/about', (req, res) => res.render("about"));
app.get('/contact', (req, res) => res.render("contact"));
app.get('/info', (req, res) => res.render("terms"));

app.listen(port, () => console.log(`app listening on port ${port}!`))