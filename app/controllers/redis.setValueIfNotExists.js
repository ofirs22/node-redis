const sentinelClient = require('../config/redis.config');

exports.setValueIfNotExists = async (req, res) => {
    const { key, value } = req.body;

    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const exists = await sentinelClient.exists(key)
    if(!exists){
        const output = await sentinelClient.set(key, value);
        console.log("output",output);
        if(output >= 0){
            return res.send('Success');
        }else{
            return res.send('Fail');
        }

    }else{
        return res.send('Hash already exists')
    } 
}