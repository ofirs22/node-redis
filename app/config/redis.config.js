
require('dotenv').config();
//Creating a singleton object for the entire application
const Redis = require('ioredis');

//redis config
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

class RedisClient {
    constructor() {
        this.client = new Redis(sentinelConfig)
    }

    getClient(){
        return this.client;
    }
}



const redisClient = new RedisClient();

module.exports = redisClient.getClient();