const express = require('express');
const dbUtils = require('./models/contract.js');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 80;

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

app.get('/hello', function (req, res){
  res.send('hello world');
});

app.get('/contracts', async function (req, res){
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let lowestPrice = req.body.lowestPrice;
  let highestPrice = req.body.highestPrice;
  let userIsLogged = req.body.userIsLogged;

  if(userIsLogged === false){
    res.status(403);
    res.send("Requeter is not logged");
  } else{
    let contractList = await dbUtils.getContracts(startDate, endDate, lowestPrice, highestPrice);
    res.status(200);
    res.send(contractList);
  }
});

app.get('*', function (req, res){
  res.status(401);
  res.send('Nothing to see here');
});

app.post('*', function (req, res){

});

app.listen(port, function(){
  console.log('Listening on port '+ port);
});
