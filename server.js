const express = require('express');
const dbUtils = require('./models/contract.js');
const app = express();
const port = process.env.PORT || 80;


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

app.get('/contracts/:lowestPrice/:highestPrice/:startDate/:endDate/:userIsLogged', async function (req, res){
  let startDate = req.params.startDate;
  let endDate = req.params.endDate;
  let lowestPrice = req.params.lowestPrice;
  let highestPrice = req.params.highestPrice;
  let userIsLogged = req.params.userIsLogged;

  if(userIsLogged === false){
    res.status(403);
    res.send("Requeter is not logged");
  } else{
    let contractList = await dbUtils.getContracts(startDate, endDate, lowestPrice, highestPrice);
    if(contractList.length === 0){
      res.status(204);
      res.send(contractList);
    } else{
      res.status(200);
      res.send(contractList);
    }
  }
});

app.get('*', function (req, res){
  res.status(405);
  res.send('This API does not handle this URL');
});

app.post('*', function (req, res){
  res.status(405);
  res.send('This API does not handle POST');
});

app.delete('*', function (req, res){
  res.status(405);
  res.send('This API does not handle DELETE');
});

app.put('*', function (req, res){
  res.status(405);
  res.send('This API does not handle PUT');
});

app.listen(port, function(){
  console.log('Listening on port '+ port);
});
