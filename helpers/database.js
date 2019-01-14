const DABASE_NAME = 'progweb2018';
const contractCol = 'contract';
const MONGO_URL = 'mongodb://admin1:admin1@ds051658.mlab.com:51658/progweb2018';
const MongoClient = require('mongodb').MongoClient;

let utils = {
  DBname: DABASE_NAME,
  DBcontract: contractCol,
  DBurl: MONGO_URL,
  MongoClient: MongoClient
};

module.exports = utils;
