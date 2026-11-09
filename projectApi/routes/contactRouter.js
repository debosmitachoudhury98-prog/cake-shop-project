
const express = require('express');
const router = express.Router();

const Contact = require('../models/contactModel');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// SAVE CUSTOMER CONTACT MESSAGE - Public
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                message: 'All fields are required.'
            });
        }

        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });

        await newContact.save();

        return res.status(201).json({
            message: 'Message sent successfully!'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to send message.',
            error: error.message
        });
    }
});

// ADMIN - VIEW ALL CUSTOMER MESSAGES
router.get('/', authenticate, authorize, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });

        return res.status(200).json(messages);

    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch messages.'
        });
    }
});

// ADMIN - DELETE CUSTOMER MESSAGE
router.delete('/:id', authenticate, authorize, async (req, res) => {
    try {
        const deletedMessage = await Contact.findByIdAndDelete(req.params.id);

        if (!deletedMessage) {
            return res.status(404).json({
                message: 'Message not found.'
            });
        }

        return res.status(200).json({
            message: 'Message deleted successfully!'
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Failed to delete message.'
        });
    }
});

module.exports = router;
