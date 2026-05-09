const express = require('express');
const app = express();
const port = 3000;

// import cors middleware
const cors = require("cors");

// abilito dominio forntend
app.use(cors({
  origin: 'http://localhost:5173'
}));

// importo il router
const movieRouter = require('./routers/movieRouter')

// importo middelware di gestione errore 500
const errorHandler = require('./middlewares/errorsHandler'); 

// importo middelware di gestione errore 404
const notFound = require('./middlewares/notFound'); 

// Rotta di Home
app.get('/', (req, res) =>{
    res.send("Benvenuto nella API della miei Film")
});

// rotte di CRUD
app.use("/api/movie", movieRouter)

//registra globalmente il middelware di gestione errore 500
app.use(errorHandler);

//registra globalmente il middelware di gestione chiamata su rotta inesistente
app.use(notFound);

// Listner
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
