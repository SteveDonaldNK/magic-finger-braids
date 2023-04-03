require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const fs = require('fs');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Products = require('./products');
const testimonials = require('./testimonials');

const app = express();

const port = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.soor9qp.mongodb.net/magicDB`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

// app.use(session({
//     secret: "magic-finger-braids-secret-access-key-by-donald-237-03-03-2023",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    image: String,
    options: Array,
    min: Number,
    max: Number,
}, { timestamps: true});

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

app.post('/sort-products', async (req, res) => {
    let products = [];
    switch (req.body.id) {
        case '1':
            products = await Product.find().sort({updatedAt: 1});
            break;
    
        case '2':
            products = await Product.find().sort({min: 1} );
            break;
    
        case '3':
            products = await Product.find().sort({min: -1} );
            break;
    
        default:
            products = await Product.find();
            break;
    }
    const template = fs.readFileSync(__dirname + '/views/partials/Products/Products.ejs', 'utf8');
    const html = ejs.render(template, {products});
    res.send(html);
});

app.get('/', (req, res) => {
    res.render("home", {featuredProducts: Products, testimonials})
});
    
app.get('/shop', async (req, res) => {
    const products = await Product.find();
    res.render("shop", {products});
});

app.get('/shop/:productId', async (req, res) => {
    const id = req.params.productId;
    const product = await Product.findById(id);
    res.render("product", {product});
});

app.get('/about', (req, res) => res.render("about"));

app.get('/contact', (req, res) => res.render("contact"));

app.get('/info', (req, res) => res.render("terms"));

app.get('/checkout', (req, res) => res.render("checkout"));


app.listen(port, () => console.log(`app listening on port ${port}!`))