
require('dotenv').config();

const Redis = require('ioredis');
let sentinelClient;

// Replace these with your actual Sentinel configuration
const sentinelConfig = {
    sentinels: [
        { host: 'redis-sentinel-node-0.redis-sentinel-headless.redis.svc.cluster.local', port: 26379 },
        { host: 'redis-sentinel-node-1.redis-sentinel-headless.redis.svc.cluster.local', port: 26379 },
        // Add more Sentinel instances if needed
    ],
    name: 'mymaster', // Replace 'mymaster' with your master name
    password: 'password',
    sentinelPassword: 'password',
};

const initializeRedisClient = async() => {

    try {
        sentinelClient = await new Redis(sentinelConfig);
        console.log(sentinelClient, "line 23");
        return sentinelClient;
    } catch (error) {
        console.error('Error initializing Redis client:', error);
        throw error; // Rethrow the error for handling in the caller
    }
}

const getClient = () => {
    console.log('get client', sentinelClient);
    return sentinelClient
}

module.exports = {
    initializeRedisClient,
    getClient,
};