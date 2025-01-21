import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './utils/db.js';

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use user routes
app.use('/users', userRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on ' + port);
});