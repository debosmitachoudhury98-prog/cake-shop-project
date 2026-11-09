
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },

    products: [{
        productId: String,
        name: { type: String, required: true },
        category: String,
        price: { type: Number, required: true, min: 0 },
        image: String,
        quantity: { type: Number, required: true, min: 1 }
    }],

    total: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        default: 'Order Placed'
    }

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
