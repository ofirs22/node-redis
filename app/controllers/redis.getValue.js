const sentinelClient = require('../config/redis.config');


exports.getValue  = async (req, res) => {

    console.log("getValue");
    const { key } = req.params;

    sentinelClient.on('error', err => console.log('Redis Client Error', err));
    const output = await sentinelClient.get(key);
    if(!output){
      return res.send('No such key in this set');
    }else{
      console.log("output", output);
      return res.send(output);
    }
  };