require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Products = require('./products');
const testimonials = require('./testimonials');

const app = express();
const port = process.env.PORT || 3000
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.soor9qp.mongodb.net/magicDB`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    category: String,
    image: String,
    options: Array,
    min: Number,
    max: Number,
}, { timestamps: true});

productSchema.index({name: "text"}, {default_language: "none"});

const Product = mongoose.model('product', productSchema);

// Products.forEach(product => {
//     const newProduct = new Product({
//         name: product.name,
//         type: product.type,
//         category: product.category,
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

app.post('/get-products', async (req, res) => {
    const storedItems = req.body.storedItems;
    const products = await Product.find({_id: { $in: storedItems}});

    const template = fs.readFileSync(__dirname + '/views/partials/Products/Products.ejs', 'utf8');
    const html = ejs.render(template, {products});
    res.send(html);
});

app.post('/create-checkout-session', async (req, res) => {
    const promises = req.body.items.map(async item => {
        const storedItem = await Product.findById(item.id);
        const optionPrice = await storedItem.options.find(option => option.name === item.option);
        
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${storedItem.name} - ${optionPrice.name} (Final payment after hair is done)`,
                },
                unit_amount: 0
            },
            quantity: item.quantity
        }
    });

    const appointment = {
        price_data: {
            currency: 'usd',
            product_data: {
                name: `*** Appointment - ${req.body.bookingDate} ***`,
            },
            unit_amount: (51.8 * 100)
        },
        quantity: 1
    }

    const resolvedPromises = await Promise.all(promises)
    .then(results => {
        results.unshift(appointment)
        return results;
    })
    .catch(error => {
        console.log(error); 
    });


    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: resolvedPromises,
            mode: 'payment',
            success_url: `${process.env.DEV_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.DEV_DOMAIN}/checkout/failure?session_id={CHECKOUT_SESSION_ID}`,
        })
        res.json({url: session.url})
    } catch (error) {
        res.status(500).json({error: error})
    }
});

app.get('/search', async (req, res) => {
    const sortby = req.query.sortby;
    const filterby = req.query.filterby;
    const update = req.query.update;
    const query = req.query.query;
    let products = [];

    if (query === null || query === undefined) {
        res.redirect('/shop');
    } else {
        switch (sortby) {
            case 'latest':
                products = await Product.find({$text: { $search: query}}).sort({updatedAt: 1});
                break;
    
            case 'low':
                products = await Product.find({$text: { $search: query}}).sort({min: 1} );
                break;
    
            case 'high':
                products = await Product.find({$text: { $search: query}}).sort({min: -1} );
                break;
    
            default:
                products = await Product.find({$text: { $search: query}});
                break;
        }
        switch (filterby) {
            case 'women':
                products = products.filter(product => product.type === 'women')
                break;
    
            case 'men':
                products = products.filter(product => product.type === 'men')
                break;
    
            case 'kids':
                products = products.filter(product => product.type === 'Kids');
                break;
    
            default:
                products = products;
                break;
        }
    
        if (update !== undefined) {
            const template = fs.readFileSync(__dirname + '/views/partials/Products/Products.ejs', 'utf8');
            const html = ejs.render(template, {products});
            res.send(html);
        } else {
            res.render("shop", {products});
        }
    }
});

app.get('/wishlist', (req, res) => {
    res.render("wishlist", {products: Products, pageTitle: 'Wishlist', pageLink: 'wishlist'})
})

app.get('/', (req, res) => {
    res.render("home", {featuredProducts: Products, testimonials})
});
    
app.get('/shop', async (req, res) => {
    const sortby = req.query.sortby;
    const filterby = req.query.filterby;
    const update = req.query.update;
    let products = [];

    switch (sortby) {
        case 'latest':
            products = await Product.find().sort({updatedAt: 1});
            break;

        case 'low':
            products = await Product.find().sort({min: 1} );
            break;

        case 'high':
            products = await Product.find().sort({min: -1} );
            break;

        default:
            products = await Product.find();
            break;
    }
    switch (filterby) {
        case 'women':
            products = products.filter(product => product.type === 'women')
            break;

        case 'men':
            products = products.filter(product => product.type === 'men')
            break;

        case 'kids':
            products = products.filter(product => product.type === 'Kids')
            break;

        default:
            products = products;
            break;
    }

    if (update !== undefined) {
        const template = fs.readFileSync(__dirname + '/views/partials/Products/Products.ejs', 'utf8');
        const html = ejs.render(template, {products});
        res.send(html);
    } else {
        res.render("shop", {products});
    }
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

app.get('/checkout/success', (req, res) => {
    stripe.checkout.sessions.retrieve(req.query.session_id)
    .then(resolved => {
        if (resolved.payment_status === 'paid') {
            res.render("success");
        } else {
            res.redirect("/shop");
        }
    })
    .catch(err => {
        console.log("wrong session id!");
        res.redirect("/shop");
    });
});

app.get('/checkout/failure', (req, res) => {
    stripe.checkout.sessions.retrieve(req.query.session_id)
    .then(resolved => {
        if (resolved.payment_status === 'unpaid') {
            res.render("failure");
        } else {
            res.redirect("/shop");
        }
    })
    .catch(err => {
        console.log("wrong session id!");
        res.redirect("/shop");
    });
});

app.all('*', (req, res) => {
    res.render("notFound");
})


app.listen(port, () => console.log(`app listening on port ${port}!`))