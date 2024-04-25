const sentinelClient = require('../config/redis.config');

exports.setValue = async (req, res) => {
    const { key, value } = req.params;
    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.set(key , value);
    if(output === 'OK'){
      return res.send('Success');
    }else{
      return res.send('Fail');
    }
  }
  
  