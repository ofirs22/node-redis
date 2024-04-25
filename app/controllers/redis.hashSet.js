const sentinelClient = require('../config/redis.config');

exports.hashSet = async (req, res) => {
    console.log("hashSet");
    const body = req.body;
    const { hash } = req.params;
    const fieldValues = Object.entries(body).flat();
    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.hset(hash, ...fieldValues);
    if(output >= 0){
        console.log('Success');
        return res.send('Success');
      }else{
        console.log('Fail');
        return res.send('Fail');
      } 
}