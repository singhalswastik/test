const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const database = require("./database");

database
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((res) => console.log(`Error: ${res}`));

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
  database
    .findone(request.query)
    .then((res) => {
      console.log(res);
      response.send({ request: "GET", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.post("/", function (request, response) {
  console.log(request.body);
  database
    .addone(request.body)
    .then((res) => {
      console.log(res);
      response.send({ request: "POST", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.patch("/:id", function (request, response) {
  console.log(request.body);
  database
    .update(request.params.id, request.body)
    .then((res) => {
      console.log(res);
      response.send({ request: "PATCH", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.put("/:id", function (request, response) {
  console.log(request.body);
  database
    .update(request.params.id, request.body)
    .then((res) => {
      console.log(res);
      response.send({ request: "PUT", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.delete("/:id", function (request, response) {
  console.log(request.body);
  database
    .delete(request.params.id)
    .then((res) => {
      console.log(res);
      response.send({ request: "DELETE", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.listen(3000, () => {
  console.log("Express intro running on localhost:3000");
});
