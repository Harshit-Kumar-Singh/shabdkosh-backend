const http = require("http");
const { insertInDatabase, searchInDatabase } = require("./database");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method == "GET" && req.url == "/"){
    res.end("[Backend is Started]")
  }
  if (req.method == "POST") {
    if (req.url === "/") 
    {

      req.on("data", (my_data) => {   
        insertInDatabase(my_data);
      });
      res.end('{"statusCode":"200"}');
    }
    if (req.url === "/data") {
      let dataX = "WA";
      req.on("data", (my_data) => {
        my_data = my_data + "";
        searchInDatabase(my_data).then((tempRes) => {
       
          if (tempRes.length == 0) {
            dataX = "WA";
          } else {
            dataX = tempRes[0].des;
          }
          dataX = JSON.stringify(dataX);
          res.end(`{"data":${dataX}}`);
        });
      });
    }
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[Server Started][${PORT}][0.0.0.0]`);
});
