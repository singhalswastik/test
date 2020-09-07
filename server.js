const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const database = require("./database");

database.connect().then(() => console.log("Connected to database"));

const urlLogger = (request, response, next) => {
  console.log("Request URL:", request.url);
  next();
};
const timeLogger = (request, response, next) => {
  console.log("Datetime:", new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
  console.log(request.query);
  database.addone(request.query).then((res) => console.log(res));
  response.send("Got a GET request");
});

app.post("/", function (request, res) {
  console.log(request.body);
  database.addone(request.body).then((res) => console.log(res));
  res.send("Got a POST request");
});

app.patch("/:id", function (request, res) {
  console.log(request.body);
  database.update(request.params.id,request.body).then((res) => console.log(res));
  res.send("Got a PATCH request");
});

app.put("/:id", function (request, res) {
  console.log(request.body);
  database.update(request.params.id,request.body).then((res) => console.log(res));
  res.send("Got a PUT request");
});

app.delete("/:id", function (request, res) {
  console.log(request.body);
  database.delete(request.params.id).then((res) => console.log(res));
  res.send("Got a DELETE request");
});

app.listen(3000, () => {
  console.log("Express intro running on localhost:3000");
});
