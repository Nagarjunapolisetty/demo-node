import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './utils/db.js';
import { getPokemon } from './controllers/userController.js';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/users', userRoutes);

// Route to fetch Pokémon data
app.get('/pokemon', getPokemon);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on ' + port);
});