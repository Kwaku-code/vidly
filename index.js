const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [ 
    {movieId: 1, movieGenre: 'action'},
    {movieId: 1, movieGenre: 'comedy'},
    {movieId: 1, movieGenre: 'family'} 
];

function validateMovie(genre) {
    const schema = {
        movieGenre : Joi.string.min(2).required()
    };

    return Joi.validate(genre, schema);
};

app.post('/api/genres/:movieId', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        movieId: genres.length + 1,
        movieGenre: req.body.movieGenre
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:movieId', (req, res) => {
    const genre = genres.find(m => m.movieId == (req.params.movieId));
    if (!genre) return res.status(404).send('The genre with the given id was not found.');

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.movieGenre = req.body.movieGenre;
    res.send(genre);
});

app.delete('/api/genres/:movieId', (req, req) => {
    const genre = genres.find(m => m.movieId == (req.params.movieId));
    if (!genre) return res.status(404).send('The genre with the given id was not found.');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

app.get('/api/genres/:movieId', (req, res) => {
    const genre = genres.find(m => m.movieId == (req.params.movieId));
    if (!genre) return res.status(404).send('The genre with the given id was not found.');
    res.send(genre);
});


