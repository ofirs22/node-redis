
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
        //redis events listeners
        this.client.on('connect', () => {
            console.log('Connection initiation has just started');
            // Perform operations that require a connection here
        });
        this.client.on('ready', () => {
            console.log('Connection is now ready to accept commands');
            // Perform operations that require a connection here
        });  
        redisClient.on('reconnecting', () => {
            console.log('Redis client is reconnecting');
            // Handle reconnecting state, if needed
        });
        redisClient.on('end', () => {
            console.log('Redis client connection has ended');
            // Perform cleanup tasks, if needed
        });
        redisClient.on('reconnectFailed', () => {
            console.error('Redis client failed to reconnect');
            // Handle reconnection failure, if needed
        });    
        this.client.on('error', (err) => {
        console.error('Redis connection error:', err);
        // Handle connection errors here
        });
    }

    getClient(){
        return this.client;
    }
}



const redisClient = new RedisClient();

module.exports = redisClient.getClient();