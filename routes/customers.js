const { Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
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
    const { error } = validate(req.body);
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

module.exports = router;