const express = require('express');
const app = express();
const port = 8080;
const Redis = require('ioredis');


const sentinelConfig = {
  sentinels: [
      { host: 'redis-sentinel-node-0.redis-sentinel-headless.redis.svc.cluster.local', port: 26379 },
      { host: 'redis-sentinel-node-1.redis-sentinel-headless.redis.svc.cluster.local', port: 26379 },
      // Add more Sentinel instances if needed
  ],
  name: 'mymaster', // Replace 'mymaster' with your master name
  password: 'M4MDvf4AQwgbwX6Y',
  sentinelPassword: 'M4MDvf4AQwgbwX6Y',
};

const subClient = new Redis(sentinelConfig)

const redisClient = require('./app/config/redis.config');

// Subscribe to the __keyspace@0__:connect channel to monitor client connections
subClient.subscribe('__keyspace@0__:connect');

// Listen for messages on the subscribed channel
subClient.on('message', (channel, message) => {
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
