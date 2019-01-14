const express = require('express');
const dbUtils = require('./models/contract.js');
const bodyParser = require('body-parser');
const app = express();
const port = port = process.env.PORT || 80;

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res){
  res.send('hello world');
});

app.get('/toto', function (req, res){
  res.send('hello toto');
});

app.post('/contracts', async function (req, res){
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let lowestPrice = req.body.lowestPrice;
  let highestPrice = req.body.highestPrice;

  let contractList = await dbUtils.getContracts(startDate, endDate, lowestPrice, highestPrice);
  res.send(contractList);
});

app.listen(port, function(){
  console.log('Listening on port '+ port);
});
