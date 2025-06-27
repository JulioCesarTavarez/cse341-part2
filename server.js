require('dotenv').config();
const express = require('express');
const pokeRoutes = require('./routes/routes.js');
const { getPokemon, getPokemonById, createPokemon, updatePokemon, deletePokemon} = require('./controllers/pokemon.js')
const mongoose = require("mongoose");
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');



// Create an instance of an Express application
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connection db
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

// Define a route handler for the root URL ('/')
// app.get('/', getName);

// contacts
app.use('/', pokeRoutes);
// app.get('/pokemon', getPokemon);
// app.get('/pokemon/:id', getPokemonById);
// app.post('/pokemon', createPokemon);
// app.put('/pokemon/:id', updatePokemon);     // PUT route
// app.delete('/pokemon/:id', deletePokemon);  // DELETE route
// handle not found
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// app.use('/', './controllers/routes.js'); 
// Define the port number the server will listen on
const PORT = 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


