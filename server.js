const express = require('express');
const app = express();
const port = 8080;


const redisClient = require('./app/config/redis.config');




app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello world");
})

require('./app/routes/redis.route')(app);


app.listen(port, () => { 
  console.log("app connected via port " + port)
})
