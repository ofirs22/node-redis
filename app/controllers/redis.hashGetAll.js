const sentinelClient = require('../config/redis.config');

exports.hashGetAll = async(req, res) => {

    const { hash } = req.params;
    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.hgetall(hash);
    if(!output){
        return res.send('No such field in the specified hash')
    }else{
        return res.send(output)
    }

}