const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [ 
    {movieId: 1, genre: 'action'},
    {movieId: 1, genre: 'comedy'},
    {movieId: 1, genre: 'family'} 
];

function validateMovie(movie) {
    const schema = {
        genre : Joi.string.min(2).required()
    };
};

app.post('/api/movies/')