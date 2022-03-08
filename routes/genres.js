const express = require('express');
const router = express.Router();

const genres = [ 
    {movieId: 1, movieGenre: 'action'},
    {movieId: 2, movieGenre: 'comedy'},
    {movieId: 3, movieGenre: 'family'}
];

function validateMovie(genre) {
    const schema = {
        movieGenre : Joi.string().min(2).required()
    };

    return Joi.validate(genre, schema);
};

router.post('/', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        movieId: genres.length + 1,
        movieGenre: req.body.movieGenre
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:movieId', (req, res) => {
    const genre = genres.find(m => m.movieId == parseInt(req.params.movieId));
    if (!genre) return res.status(404).send('The genre with the given id was not found.');

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.movieGenre = req.body.movieGenre;
    res.send(genre);
});

router.delete('/:movieId', (req, res) => {
    const genre = genres.find(m => m.movieId == parseInt(req.params.movieId));
    if (!genre) return res.status(404).send('The genre with the given id was not found.');

    const index = genres.indexOf(genre);
    genres.splice(index, 1)

    res.send(genre);
});

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:movieId', (req, res) => {
    const genre = genres.find(m => m.movieId == parseInt(req.params.movieId));
    if (!genre) return res.status(404).send('The genre with the given id was not found.');
    res.send(genre);
});

module.exports = router;