const { MongoClient, Int32 } = require("mongodb");
const uri =
  "mongodb+srv://swastik:Swastik@02@cluster0.ekar9.mongodb.net/testDb?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const addone = (newItem) => {
  return Promise.resolve()
    .then(() =>
      client.db("testDb").collection("testCollection").insertOne(newItem)
    )
    .then(
      (res) => `New listing created with the following id: ${res.insertedId}`
    )
    .catch((res) => `Error: ${res}`);
};
const findone = (query) => {
  return Promise.resolve()
    .then(() =>
      client.db("testDb").collection("testCollection").findOne(query)
    )
    .catch((res) => `Error: ${res}`);
};
const update = (id, newItem,upsertValue) => {
  return Promise.resolve()
    .then(() =>
      client
        .db("testDb")
        .collection("testCollection")
        .updateOne({ id: id }, { $set: newItem }, {$upsert: true})
    )
    .then(() => `One item updated`)
    .catch((res) => `Error: ${res}`);
};

const del = (id) => {
  return Promise.resolve()
    .then(() =>
      client.db("testDb").collection("testCollection").deleteOne({ id: id })
    )
    // .then(() => `One item deleted`)
    .catch((res) => `Error: ${res}`);
};

const connect = () => {
  return Promise.resolve()
    .then(() => client.connect())
    .catch(() => "Error connecting to database");
};

exports.connect = connect;
exports.addone = addone;
exports.update = update;
exports.delete = del;
exports.findone = findone;