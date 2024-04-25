const sentinelClient = require('../config/redis.config');

exports.hashSet = async (req, res) => {
    console.log("hashSet");
    const body = req.body;
    const { hash } = req.params;

    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.hset(hash, body);
    if(output >= 0){
        console.log('Success');
        return res.send('Success');
      }else{
        console.log('Fail');
        return res.send('Fail');
      } 
}