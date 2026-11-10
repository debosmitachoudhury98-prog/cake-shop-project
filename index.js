const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Import existing routes
const category = require('./routes/categoryRouter');
const user = require('./routes/userRouter');
const item = require('./routes/itemRouter');

// Import new routes
const product = require('./routes/productRouter');
const contact = require('./routes/contactRouter');
const order = require('./routes/orderRouter');
const emailRouter = require('./routes/emailRouter');

// MongoDB connection
mongoose.connect(process.env.mongodb+srv://debosmitachoudhury98_db_user:JHRG3aMVbLkQMZhC@cluster0.2elheeb.mongodb.net/cake-shop
    );
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
  });

// Home route
app.get('/', (req, res) => {
  res.send('Hi, I am working fine');
});

// API routes
app.use('/category', category);
app.use('/user', user);
app.use('/item', item);
app.use('/product', product);
app.use('/contact', contact);
app.use('/order', order);
app.use('/api/orders', emailRouter);

// Export app for Vercel
module.exports = app;