const {getClient} = require('../config/redis.config');
console.log(getClient());

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