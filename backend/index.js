const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//Connect mongoDB database
const mongooseURI = "mongodb+srv://admin:nielseneats123@cluster0.seoqady.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongooseURI);

//user Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true }, // Ensure username is unique
    password: String,
    email: { type: String, unique: true }, // Ensure email is unique
    isAdmin: Boolean,
});
const User = new mongoose.model('User', UserSchema);

//product schema
const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,    
    category: String,
    image: String
});
const Product = new mongoose.model('Product', ProductSchema);

const MenuListSchema = new mongoose.Schema({
    menu_name: String,
    menu_image: String,
});

const MenuList = new mongoose.model('menu_list', MenuListSchema);

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
        const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
        if (existingUser) {
            return res.status(400).send('Username or email already exists');
        }
        const hashedPass = bcrypt.hashSync(req.body.password, 8);
        const user = new User({ username: req.body.username, password: hashedPass, email: req.body.email, isAdmin: false });
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
        if (!user) return res.status(404).send('User Not Found');
        
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, 'Your_Secret_Key');
            res.status(200).json(token);
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch (error) {
        res.status(500).send('Error during login');
    }
});

//add product
app.post('/prod', verifyToken, async (req, res) => {
    try {
        
        const { name, description, price, category, image } = req.body;
        const prod = new Product({ name, description, price, category, image });
        const p = await prod.save();
        res.status(201).json(p);
    } catch (error) {
        res.status(500).send('Error creating product');
    }
});

//update product
app.put('/:id', (req, res) => {
    const { name, description, price, category, image } = req.body;

    Product.findByIdAndUpdate(req.params.id, { name, description, price, category, image })
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
app.get('/prods', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send("Products not found");
    }
});

app.get('/getmenulist', async (req, res) => {
    try {
        const menu_list = await MenuList.find();
        res.send(menu_list);
    } catch (error) {
        res.status(500).send("Menu List not found");
    }
});

app.post('/addcategory', verifyToken, async (req, res) => {
    try {
      const { menu_name, menu_image } = req.body;
      const newCategory = new MenuList({ menu_name, menu_image });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).send('Error adding category');
    }
  });  

app.get('/userinfo', verifyToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).send("User not found"+userId);
      }
      
      res.send(user);
    } catch (error) {
      res.status(500).send("Server error");
    }
  });

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port no. ${port}`);
});