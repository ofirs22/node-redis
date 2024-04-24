const sentinelClient = require('../config/redis.config');

exports.getValue  = async (req, res) => {
    console.log(sentinelClient);
    const { key } = req.params;

    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.get(key);
    if(!output){
      res.send('No such key in this set');
    }else{
      res.send(output);
    }
  };