const express = require('express');
const app = express();
const port = 8080;


const redisClient = require('./app/config/redis.config');

// Subscribe to the __keyspace@0__:connect channel to monitor client connections
redisClient.subscribe('__keyspace@0__:connect');

// Listen for messages on the subscribed channel
redisClient.on('message', (channel, message) => {
    if (channel === '__keyspace@0__:connect') {
        console.log('Client connected:', message);
        // Here, 'message' will be the client's IP address or identifier
        // You can add more logic to handle the connection event
    }
});


app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello world");
})

require('./app/routes/redis.route')(app);


app.listen(port, () => { 
  console.log("app connected via port " + port)
})
