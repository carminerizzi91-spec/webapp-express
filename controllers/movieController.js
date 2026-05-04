const connection = require('../data/db');

function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed!' });
        res.json(results);
    });

}

function show(req, res) {
    // Id dall'url
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
        // chiamata esecuzione query recensione
        connection.query(reviewsSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            movie.reviews = reviewResults;
            res.json(movie);
        })
        
    })

}

module.exports = { index, show }