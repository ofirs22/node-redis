const sentinelClient = require('../config/redis.config');


exports.getValue  = async (req, res) => {


    const { key } = req.params;

    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.get(key);
    if(!output){
      return res.send('No such key in this set');
    }else{
      return res.send(output);
    }
  };