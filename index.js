import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";

const app = express(); // Initialize an Express application instance
const PORT = 3000;

const mongoURI = "mongodb://localhost:27017/users_db";
const redisClient = createClient(); // Initialize a Redis client instance

redisClient.on("error", (error) => console.error("Redis Client Error", error));

async function initialize() {
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
        const connection = await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        app.set('mongooseConnection', connection);
    } catch (err) {
        console.error("Error during initialization:", err);
    }
}

initialize();

const fetchApiData = async function () {
    try {
        const data = await mongoose.connection.db.collection('users').find().toArray();
        return data;
    } catch (error) {
        console.log(error);
    }
};


// Define a route to fetch users
app.get("/users", async (req, res) => {
    try {
        // Getting data from Redis
        const cache = await redisClient.get("users");

        // If data is stored in Redis
        if (cache != null) {
            console.log("Data fetched from cache");
            return res.json(JSON.parse(cache));
        }

        // If data is not stored in Redis
        // Get data from API
        const data = await fetchApiData();
        console.log("Data fetched from API");

        // Saving unique data to Redis with expiration
        await redisClient.set("users", JSON.stringify(data), { EX: 600, NX: true });

        res.json(data);
    } catch (error) {
        res.status(500).send("Error retrieving users");
    }
});

// Start the server at the specified PORT
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});