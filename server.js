// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// 2. The "/all" path, display every entry in the collection
app.get("/all", function(req,res){
  db.scrapeData.find({}, function(error, found){
if(error){
  console.log(error);
  res.status(500).send(error);
} else {
  res.json(found)
}
})
})

app.get("/scrape", function(req, res){
  axios.get("http://news.ycombinatior.com/").then(function(response))
  res.send(response.data);
  var $ = cheerio.load(response.data)
  $(".title > a").each(function(i, element){
    var title = $(element).text()
    var link = $(element).attr("href")
    if(title && link){
      db.scrapedData.insert({
        title,
        link
      })
    }
  })
}

// 3. At the "/name" path, display every entry in the animals collection, sorted by name
// app.get("/name", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
  // db.animals.find().sort({ name: 1 }, function(error, found) {
    // Log any errors if the server encounters one
    // if (error) {
    //   console.log(error);
    // }
    // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
// app.get("/weight", function(req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  // db.animals.find().sort({ weight: -1 }, function(error, found) {
    // Log any errors if the server encounters one
    // if (error) {
    //   console.log(error);
    // }
    // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
