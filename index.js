const fetch = require("node-fetch");
const tick = Date.now();
const log = (v) => {
  console.log(v + "\n*******Elapsed Time: " + (Date.now() - tick));
};

// const codeBlocker=async()=>
// {
//   let i=0;
//   while(i<100000000)
//   {
//     i++;
//   }
//   return "billion complete";
// }
// codeBlocker().then(res=>log(res));
// log("Syncronus function");

const codeBlocker = () => {
  return new Promise((reject, resolve) => {
    let i = 0;
    const data = fetch("https://www.google.com");
    data
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
    log("test");
  });
};
// log("Syncronus function1");
const random = () => {
  codeBlocker()
    .then((res) => log("123"))
    .catch((error) => {
      //console.log(error);
    });
};
random();
log("Syncronus function");
