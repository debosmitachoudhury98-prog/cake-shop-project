
const express = require('express');
const router = express.Router();

const Product = require('../models/productModel');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET ALL PRODUCTS - Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        return res.status(200).json(products);

    } catch (error) {
        console.error('Get products error:', error.message);

        return res.status(500).json({
            message: 'Failed to fetch products'
        });
    }
});

// GET SINGLE PRODUCT - Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.status(200).json(product);

    } catch (error) {
        return res.status(400).json({
            message: 'Invalid product ID'
        });
    }
});

// ADD PRODUCT - Admin only
router.post('/', authenticate, authorize, async (req, res) => {
    try {
        const { name, category, price, image, description } = req.body;

        if (!name || !category || price === undefined || !image) {
            return res.status(400).json({
                message: 'Name, category, price and image are required'
            });
        }

        const newProduct = new Product({
            name: name.trim(),
            category: category.trim(),
            price,
            image,
            description
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: 'Product added successfully',
            product: savedProduct
        });

    } catch (error) {
        console.error('Add product error:', error.message);

        return res.status(500).json({
            message: 'Failed to add product',
            error: error.message
        });
    }
});

// UPDATE PRODUCT - Admin only
router.put('/:id', authenticate, authorize, async (req, res) => {
    try {
        const { name, category, price, image, description } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, category, price, image, description },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });

    } catch (error) {
        console.error('Update product error:', error.message);

        return res.status(400).json({
            message: 'Failed to update product',
            error: error.message
        });
    }
});

// DELETE PRODUCT - Admin only
router.delete('/:id', authenticate, authorize, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            message: 'Product deleted successfully'
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Invalid product ID'
        });
    }
});

module.exports = router;
