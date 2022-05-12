const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String, 
        required: true,
        minlenght: 5,
        maxlength: 50
    }
}));

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name : Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;