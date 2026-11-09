
const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');

require('dotenv').config({override:true, debug:false})
const app=express();
app.use(express.json());
// const mongoURI=process.env.MONGODB_URL;

// Import existing routes
const category = require('./routes/categoryRouter');
const user = require('./routes/userRouter');
const item = require('./routes/itemRouter');

// Import new routes
const product = require('./routes/productRouter');
const contact = require('./routes/contactRouter');
const order = require('./routes/orderRouter');
const emailRouter = require("./routes/emailRouter");

mongoose.connect(process.env.mongodb+srv:debosmitachoudhury98_db_user:JHRG3aMVbLkQMZhC@cluster0.2elheeb.mongodb.net/cake-shop)
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB Error:", err.message);
});

app.get('/', (req,res)=>{
    res.send('Hi, I am warking fine')
});


app.use('/category', category);
app.use('/user', user);
app.use('/item', item);
app.use('/product', product);
app.use('/contact', contact);
app.use('/order', order);
app.use("/api/orders", emailRouter);
app.use('cors'());

module.exports = app;