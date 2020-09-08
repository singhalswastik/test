const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const database = require("./database");
const middleware = require("./middleware");

database
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((res) => console.log(`Error: ${res}`));

app.use(middleware.urlLogger, middleware.timeLogger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(middleware.checkPost);

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

app.post("/", (request, response) => {
  console.log(request.body);
  database
    .addone(request.body)
    .then((res) => {
      console.log(res);
      response.send({ request: "POST", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.patch("/:id", (request, response) => {
  console.log(request.body);
  database
    .update(request.params.id, request.body)
    .then((res) => {
      console.log(res);
      response.send({ request: "PATCH", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.put("/:id", (request, response) => {
  console.log(request.body);
  database
    .update(request.params.id, request.body)
    .then((res) => {
      console.log(res);
      response.send({ request: "PUT", res });
    })
    .catch((res) => console.log(`Error: ${res}`));
});

app.delete("/:id", (request, response) => {
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
