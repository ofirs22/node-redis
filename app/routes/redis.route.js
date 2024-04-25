module.exports = app => {

    require('dotenv').config();
    const router = require('express').Router();
    const redisController = require('../controllers')

    app.get('/', (req, res) => {
        res.send('success')
    })
    //
    app.get('/setvalue/:key/:value',redisController.setValue);
    //
    app.get('/getvalue/:key',redisController.getValue);
    // 
    app.post('/hashset/:hash', redisController.hashSet);
      
    app.get('/hashget/:hash/:field', redisController.hashGet);
    // 
    app.post('/hashsetifnotexists/:hash', redisController.hashSetIfNotExists)

    app.use(`/`, router);
}