const sentinelClient = require('../config/redis.config');

exports.hashGet = async(req, res) => {

    const { hash, field } = req.params;
    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.hset(hash, field);
    if(!output){
        res.send('No such field in the specified hash')
    }else{
        res.send(output)
    }

}