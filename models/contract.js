let DBinfos = require('../helpers/database.js');

// Get contracts
exports.getContracts = async function(startDate, endDate, lowestPrice, highestPrice){
  const client = await DBinfos.MongoClient.connect(DBinfos.DBurl, {
      useNewUrlParser: true
  });

  const db = client.db(DBinfos.BDname);
  const filter = {
    "date": {$lte: endDate, $gte: startDate},
    "amount": {$lte: highestPrice, $gte: lowestPrice}
};
  const contracts = await db.collection(DBinfos.DBcontract).find(filter).toArray();
  client.close();
  return contracts;
}
