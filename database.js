const { MongoClient, Int32 } = require("mongodb");
const uri =
  "mongodb+srv://swastik:Swastik@02@cluster0.ekar9.mongodb.net/testDb?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const addone = (newItem) => {
  return client.db("testDb").collection("testCollection").insertOne(newItem);
};
const findone = (query) => {
  return client.db("testDb").collection("testCollection").findOne(query);
};
const update = (id, newItem, upsertValue) => {
  return client.db("testDb").collection("testCollection").updateOne({ id: id }, { $set: newItem }, { $upsert: true });
};

const del = (id) => {
  return client.db("testDb").collection("testCollection").deleteOne({ id: id });
};

const connect = () => {
  return client.connect();
};

exports.connect = connect;
exports.addone = addone;
exports.update = update;
exports.delete = del;
exports.findone = findone;
