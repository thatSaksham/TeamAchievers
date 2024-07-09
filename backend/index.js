const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//Connect mongoDB database
const mongooseURI = "mongodb://127.0.0.1:27017/Nielsen";
mongoose.connect(mongooseURI);

//user Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone_no: Number,
    email: String,
    isAdmin: Boolean,
});
const User = new mongoose.model('User', UserSchema);

//product schema
const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,    
});
const Product = new mongoose.model('Product', ProductSchema);

//verify token middleware
function verifyToken(req, res, next) {
    const token = req.headers['authentication'];
    if (!token) res.status(403).send('A token is requried for authentication');
    try {
        req.user = jwt.verify(token.split(' ')[1], 'Your_Secret_Key');
        next();
    } catch (error) {
        res.status(500).send('Invalid token');
    }
}

//register
app.post('/register', async (req, res) => {
    try {
        const hashedPass = bcrypt.hashSync(req.body.password, 8);
        const user = new User({ username: req.body.username, password: hashedPass, phone_no: req.body.phone_no, email: req.body.email, isAdmin: false});
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send(`Error registering user`);
    }
});

//login
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ userId: user._id }, 'Your_Secret_Key');
                res.json(token);
            } else {
                res.status(401).send("Invalid Credentials");
            }
        } else {
            res.status(404).send('User Not Found');
        }
    } catch (error) {
        res.status(500).send('Error during login');
    }
});

//add product
app.post('/prod', verifyToken, async (req, res) => {
    try {
        const prod = new Product({ name: req.body.name, description: req.body.description, price: req.body.price });
        const p = await prod.save();
        res.status(201).json(p);
    } catch (error) {
        res.status(500).send('Error creating product');
    }
});

//update product
app.put('/:id', (req, res) => {
    const { name, description, price } = req.body;

    Product.findByIdAndUpdate(req.params.id, { name, description, price })
        .then(product => res.json(product))
        .catch(err => console.log(err));
});

//delete product
app.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Product deleted' }))
        .catch(err => console.log(err));
});

//get all product
app.get('/prods', verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send("Products not found");
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port no. ${port}`);
});