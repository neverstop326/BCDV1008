const http = require("http"),
  url = require("url"),
  fs = require("fs"),
  io = require("socket.io");

const Restaurant = require("./model/Restaurant");
const Order = require("./model/Order");

const mongoose = require('mongoose');

const connectionString = 
"mongodb://seungjae:lbz04tap59@cluster0-shard-00-00-isqny.azure.mongodb.net:27017,cluster0-shard-00-01-isqny.azure.mongodb.net:27017,cluster0-shard-00-02-isqny.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
    })
  .then( 
    () => { 
      console.log("Mongoose connected successfully"); 
    },
    error => { 
      console.log("Mongoose could not connected to database: " + error); 
    }
  );

const server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case "/":
      fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) return send404(res);
        res.writeHead(200, {
          "Content-Type": path == "json.js" ? "text/javascript" : "text/html"
        });
        res.write(data, "utf8");
        res.end();
      });
      break;

    default:
      send404(res);
  }
});
const send404 = function(res) {
  res.writeHead(404);
  res.write("404");
  res.end();
};

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));

// socket.io, I choose you
const ioServer = io.listen(server);

// socket.io setup and manager
ioServer.on("connection", function(socket) {
  // now we have a client object!
  console.log("Connection accepted.");

  socket.on("disconnect", function() {
    console.log("Disconnected...");
  });

  socket.on("get-restaurants", () => {
    console.log("server - get-restarants called");
    
    var query = Restaurant.find()
      .where("city")
      .equals("Queens")
      .where('name')
      .regex(/Big/);

    query.exec((error, documents) => {
      if (error) console.log(`Error occured on Restaurant.find(): ${error}`);
      else {
        console.log(`Restaurant.find() returned documents: ${documents}`);
        const data = documents.map(x => {
          var restaurant = { name: x.name, cuisine: x.cuisine, city: x.city };
          return restaurant;
        });
        socket.emit("restaurants-data", JSON.stringify(data));
      }
    });
  });


  socket.on("get-orders", () => {
    console.log("server - get-orders called");

    const conditions = { customer: "Tick Tock", item: "SM Pizza" };
    Order.find(conditions, (error, documents) => {
      if (error) console.log(`Error occured on Orders.find(): ${error}`);
      else {
        console.log(`Orders.find() returned documents: ${documents}`);
        const data = documents.map((x) => {
          var restaurant = { name: x.customer, item: x.item};
          return restaurant;
        });
      }
  
      socket.emit("orders-data", JSON.stringify(documents));
    });
  });

  socket.on("add-order", () => {
    console.log("server - add-order called");

    const docToAdd = { customer: "Tick Tock", item: "SM Pizza" };

    Order.create(docToAdd)
      .then(() => {
        console.log("success");
        socket.emit("order-data-added");
      })
      .catch((err) => console.log(err));
  });
});