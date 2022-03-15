const Joi = require('joi');
const mongoose = require('mongoose');


const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    }
}));

function validateMovie(genre) {
    const schema = {
        name : Joi.string().min(2).required()
    };

    return Joi.validate(genre, schema);
};

exports.Genre = Genre;
exports.validate = validateMovie;