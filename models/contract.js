let DBinfos = require('../helpers/database.js');

// Get contracts
exports.getContracts = async function(startDate, endDate, lowerPrice, higherPrice){
  const client = await DBinfos.MongoClient.connect(DBinfos.DBurl, {
      useNewUrlParser: true
  });
  const db = client.db(DBinfos.BDname);
  const filter = {
    "date": {$lte: endDate, $gte: startDate},
    "amount": {$lte: higherPrice, $gte: lowerPrice}
};
  const contracts = await db.collection(DBinfos.DBcontract).find(filter).toArray();
  client.close();
  return contracts;
}
