const connection = require('../data/db');

// Lista libri
function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed!' });

        const movies = results.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies);
    });

}

// funzione per chiamata dettaglio libro e review
function show(req, res) {
    // copio l'Id dall'url
    const id = req.params.id

    // query con segnaposto ?
    const sql = 'SELECT * FROM movies WHERE id = ?';

    // query con segnaposto ? per le review
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // chiamata esecuzione query film
    connection.query(sql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const movie = movieResults[0];

        movie.image = req.imagePath + movie.image;

        // chiamata esecuzione query recensione
        connection.query(reviewsSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            movie.reviews = reviewResults;
            res.json(movie);
        })
    })
};

// inserimento di review specifica
function storeReview(req, res) {
    // copio l'Id dall'url
    const id = req.params.id

    // recupero info dal body
    const { text, name, vote } = req.body;

    // Query
    const sql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?,?,?,?)'

    // chiamata esecuzione query recensione
    connection.query(sql, [text, name, vote, id], (err, reviewResult) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({message: 'Review succesfuly added', id: reviewResult.insertId })
    })

}

module.exports = { index, show, storeReview }