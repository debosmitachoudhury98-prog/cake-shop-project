
const express = require('express');
const router = express.Router();

const Order = require('../models/orderModel');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// PLACE ORDER - Customer
router.post('/', authenticate, async (req, res) => {
    try {
        const { customer, products } = req.body;

        if (
            !customer ||
            !customer.name ||
            !customer.email ||
            !customer.phone ||
            !customer.address ||
            !Array.isArray(products) ||
            products.length === 0
        ) {
            return res.status(400).json({
                message: 'Complete customer and product details are required'
            });
        }

        // Ensure logged-in customer places an order for their own account
        if (
            req.user.role !== 'admin' &&
            customer.email.toLowerCase() !== req.user.email.toLowerCase()
        ) {
            return res.status(403).json({
                message: 'You can only place orders using your own account'
            });
        }

        let total = 0;

        const validProducts = products.map((item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);

            if (
                !item.name ||
                !Number.isFinite(price) ||
                price < 0 ||
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {
                throw new Error('Invalid product details');
            }

            total += price * quantity;

            return {
                productId: item.productId || String(item.id || ''),
                name: item.name,
                category: item.category || '',
                price,
                image: item.image || '',
                quantity
            };
        });

        const newOrder = new Order({
            orderId: 'EC' + Date.now(),
            customer,
            products: validProducts,
            total,
            status: 'Order Placed'
        });

        const savedOrder = await newOrder.save();

        return res.status(201).json({
            message: 'Order placed successfully',
            order: savedOrder
        });

    } catch (error) {
        console.error('Place order error:', error.message);

        return res.status(400).json({
            message: 'Failed to place order',
            error: error.message
        });
    }
});

// CUSTOMER - GET OWN ORDERS
router.get('/my-orders', authenticate, async (req, res) => {
    try {
        const orders = await Order.find({
            'customer.email': req.user.email
        }).sort({ createdAt: -1 });

        return res.status(200).json(orders);

    } catch (error) {
        console.error('Get my orders error:', error.message);

        return res.status(500).json({
            message: 'Failed to fetch orders'
        });
    }
});

// ADMIN - GET ALL ORDERS
router.get('/', authenticate, authorize, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch orders'
        });
    }
});

// ADMIN - UPDATE ORDER STATUS
router.put('/:id/status', authenticate, authorize, async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            'Order Placed',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled'
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid order status'
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        return res.status(200).json({
            message: 'Order status updated',
            order
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Failed to update order status'
        });
    }
});

// CUSTOMER - DELETE OWN ORDER
router.delete('/my-orders/:id', authenticate, async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({
            _id: req.params.id,
            'customer.email': req.user.email
        });

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        return res.status(200).json({
            message: 'Order deleted successfully'
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Invalid order ID'
        });
    }
});

module.exports = router;
