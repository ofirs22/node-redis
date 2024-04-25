const sentinelClient = require('../config/redis.config');

exports.hashSetIfNotExists = async (req, res) => {
    const body = req.body;
    const { hash } = req.params;
    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const exists = await sentinelClient.exists(hash)
    if(!exists){
        const output = await sentinelClient.hset(hash, body);
        if(output >= 0){
            return res.send('Success');
        }else{
            return res.send('Fail');
        }

    }else{
        res.send('Hash already exists')
    } 
}