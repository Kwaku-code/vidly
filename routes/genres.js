const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre ({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.put('/:movieId', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.movieId, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given id was not found.');

    res.send(genre);
});

router.delete('/:movieId', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.movieId)

    if (!genre) return res.status(404).send('The genre with the given id was not found.');

    res.send(genre);
});

router.get('/:movieId', async (req, res) => {
    const genre = await Genre.findById(req.params.movieId);

    if (!genre) return res.status(404).send('The genre with the given id was not found.');
    
    res.send(genre);
});

module.exports = router;