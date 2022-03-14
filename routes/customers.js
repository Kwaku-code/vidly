const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    },
    phone: {
        type: String, 
        required: true,
        minlenght: 5,
        maxlength: 13
    }

}));

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer ({
        isGold: req.body.isGold, 
        name: req.body.name,
        phone: req.body.phone
    });
    customer = await customer.save();

    res.send(customer);
});

router.put('/:customerId', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.customerId, { name: req.body.name }, {
        new: true
    });

    if (!customer) return res.status(404).send('The customer with the given id was not found.');

    res.send(customer);
});

router.delete('/:customerId', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.customerId)

    if (!customer) return res.status(404).send('The customer with the given id was not found.');

    res.send(customer);
});

router.get('/:customerId', async (req, res) => {
    const customer = await Customer.findById(req.params.customerId);

    if (!customer) return res.status(404).send('The customer with the given id was not found.');
    
    res.send(customer);
});

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name : Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(customer, schema);
};

module.exports = router;