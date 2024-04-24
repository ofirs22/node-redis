
require('dotenv').config();

const Redis = require('ioredis');
let sentinelClient;

// Replace these with your actual Sentinel configuration
const sentinelConfig = {
    sentinels: [
        { host: process.env.SENTINEL_HOST_1, port: process.env.SENTINEL_PORT },
        { host: process.env.SENTINEL_HOST_2, port: process.env.SENTINEL_PORT },
        // Add more Sentinel instances if needed
    ],
    name: process.env.MASTER_NAME, // Replace 'mymaster' with your master name
    password: process.env.REDIS_PASSWORD,
    sentinelPassword: process.env.SENTINEL_PASSWORD,
};

const initializeRedisClient = async() => {

    try {
        sentinelClient = await new Redis(sentinelConfig);
        console.log("sentinelClient");
        return sentinelClient;
    } catch (error) {
        console.error('Error initializing Redis client:', error);
        throw error; // Rethrow the error for handling in the caller
    }
}

module.exports = {
    initializeRedisClient,
    getClient: () => sentinelClient,
};