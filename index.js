import express from "express";
import mongoose from "mongoose";
import redis from "redis";

const app = express();
const PORT = 3000;

const mongoURI = "mongodb://localhost:27017/users_db";

const redisClient = redis.createClient({
    host: 'localhost',  // Replace with your Redis server host
    port: 6379,         // Default Redis port
    password: '',       // If your Redis server is password protected, provide the password here
    db: 0               // Optional: Select the Redis database number (default is 0)
});

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => {
      console.log("Connected to MongoDB");
      app.set('mongooseConnection', connection);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
});


redisClient.get(`user:${userId}`, (err, data) => {
    if (err) {
      return callback(err, null);
    }
    if (data) {
      // If data exists in Redis, parse and return it
      callback(null, JSON.parse(data));
    } else {
      // No data in cache, return null
      callback(null, null);
    }
});


redisClient.on("connect", (err) => {
    console.log('Connected to Redis server!');
});




app.get("/users", async (req, res) => {
  try {
    const cacheUsers = await redisClient.get('users', (err, reply) => {
        if (err) {
          console.error('Error getting key:', err);
        } else {
          console.log('The value of myKey is:', reply);  // Should print 'Hello, Redis!'
        }
      });
    if (cacheUsers) {
        console.log("Data returned from cache")
      return res.json(JSON.parse(cacheUsers));
    }
    const users = await mongoose.connection.db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error retrieving users");
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
