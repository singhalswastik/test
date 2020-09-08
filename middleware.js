const database = require("./database");
const urlLogger = (request, response, next) => {
  console.log("Request URL:", request.url);
  next();
};
const timeLogger = (request, response, next) => {
  console.log("Datetime:", new Date(Date.now()).toString());
  next();
};
const checkPost = (request, response, next) => {
  if (request.method == "POST") {
    database.findone({ email: request.body.email }).then((res) => {
      if (res != null) {
        response.send(
          "This email is already in use. please try with something else."
        );
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
exports.urlLogger = urlLogger;
exports.timeLogger = timeLogger;
exports.checkPost = checkPost;
