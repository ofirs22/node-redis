const sentinelClient = require('../config/redis.config');

exports.hashGet = async(req, res) => {

    const { hash, field } = req.params;
    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.hget(hash, field);
    if(!output){
        console.log('No such field in the specified hash');
        return res.send('No such field in the specified hash')
    }else{
        console.log("output", output);
        return res.send(output)
    }

}