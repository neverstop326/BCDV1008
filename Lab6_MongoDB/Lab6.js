//Lab 6 using Java Script - MongoDB
const mongoose = require("mongoose");

const connectionString =
"mongodb://seungjae:lbz04tap59@cluster0-shard-00-00-isqny.azure.mongodb.net:27017,cluster0-shard-00-01-isqny.azure.mongodb.net:27017,cluster0-shard-00-02-isqny.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log("Mongoose connected successfully ");
    },
    error => {
      console.log("Mongoose could not connected to database : " + error);
    }
  );

const Restaurant = require("./Restaurant");


// Exercise 1:  Creating Collections and Documents
// 1) Inserting data seed
const insertData = () => {
  console.log("inserting data to heroku");

  Restaurant.insertMany([
    {
      address: {
        building: "1008",
        street: "Morris Park Ave",
        zipcode: "10462"
      },
      city: "Bronx",
      cuisine: "Bakery",
      name: "Morris Park Bake Shop",
      restaurant_id: "30075445"
    },
    {
      address: {
        street: "Thai Son Street",
        zipcode: null
      },
      city: "Manhattan",
      cuisine: "Vietnamese",
      name: "Pho Me Long Time",
      restaurant_id: "30075455"
    },
    {
      address: {
        building: "253",
        street: "East 167 Street",
        zipcode: null
      },
      city: "Bronx",
      cuisine: "Chicken",
      name: "Mom's Fried Chicken",
      restaurant_id: "40382900"
    },
    {
      address: {
        building: "120",
        street: "East 56 Street",
        zipcode: "19800"
      },
      city: "Mahattan",
      cuisine: "Italian",
      name: "Montebello Restaurant",
      restaurant_id: "40397082"
    },
    {
      address: {
        building: "195",
        street: "Soprano Street",
        zipcode: "17500"
      },
      city: "Staten Island",
      cuisine: "Hamburgers",
      name: "Joeys Burgers",
      restaurant_id: "40397555"
    },
    {
      address: {
        building: "200",
        street: "Queens Boulevard",
        zipcode: "19700"
      },
      city: "Queens",
      cuisine: "American",
      name: "Brunos on the Boulevard",
      restaurant_id: "40397678"
    },
    {
      address: {
        building: "555",
        street: "Sushi Street",
        zipcode: "17700"
      },
      city: "Brooklyn",
      cuisine: "Japanese",
      name: "Iron Chef House",
      restaurant_id: "40397699"
    },
    {
      address: {
        building: "555",
        street: "Fontana Street",
        zipcode: null
      },
      city: "Brooklyn",
      cuisine: "Japanese",
      name: "Wasabi Sushi",
      restaurant_id: "40398000"
    },
    {
      address: {
        building: "900",
        street: "Goodfellas Street",
        zipcode: "17788"
      },
      city: "Brooklyn",
      cuisine: "Delicatessen",
      name: "Sal's Deli",
      restaurant_id: "40898000"
    },
    {
      address: {
        building: "909",
        street: "44 Gangster Way",
        zipcode: "17988"
      },
      city: "Queens",
      cuisine: "Delicatessen",
      name: "Big Tony's Sandwich Buffet",
      restaurant_id: "40898554"
    },
    {
      address: {
        building: "1201",
        street: "121 Canolli Way",
        zipcode: "17989"
      },
      city: "Queens",
      cuisine: "Delicatessen",
      name: "The Godfather Panini Express",
      restaurant_id: "40898554"
    }
  ])
    .then(() => console.log("insert man successfull"))
    .catch(e => console.log(e));
};


// 2) find data to view
const findData = () => {
  console.log('Finding data...');

  Restaurant.find({})
  .then((data) => console.log(`Found data successfully: ${data}`))
  .catch((e) => console.log(e));
  
};


//Exercise 2:  Projections, Query and Sorting
// 1) Filter — Query, 2) Select Columns (Fields) — Projections,  3) Sort
const filter = () => {
  console.log("Filtering Japanese Cuisine..");

  Restaurant
  .find(
    { "cuisine": "Japanese" },
    { 'cuisine': 1, 'name': 1 }
    )
  .sort({ 'name': -1 })
  .then((data) => console.log(`Filtered data successfully: ${data}`))
  .catch((e) => console.log(e));
};

// 4) Task 
//Filter on ‘Japanese’' cuisine using the $eq logical operator 
//Include the id, cuisines, name and city, resturant_id columns 
//Sort the restaurant_id in Ascending Order.

const taskEqual = () => {
  console.log("Filtering Japanese Cuisine using $eq...");

  Restaurant
  .find(
    { "cuisine": {$eq: "Japanese"} },
    { '_id': 1, 'cuisine': 1, 'name': 1, 'city': 1, 'restaurant_id': 1 }
    )
  .sort({ 'restaurant_id': 1 })
  .then((data) => console.log(`Filtered data successfully: ${data}`))
  .catch((e) => console.log(e));
};

//Exercise 3:  Logical and Comparison Operators
//All cuisines that are equal to Delicatessen and the city is not equal to Brooklyn
//The selected columns must include cuisines, name and city, but exclude id
//The sorting order must be Ascending Order on the name

const equalAnd = () => {
  console.log("Filtering Delicatessen and the city NOT Brooklyn...");

  Restaurant
  .find(
    { $and: [ { "cuisine": {$eq: "Delicatessen"} }, { 'city': {$ne: 'Brooklyn'} } ] },
    { '_id': 0, 'cuisine': 1, 'name': 1, 'city': 1 }
    )
  .sort({ 'name': 1 })
  .then((data) => console.log(`Filtered data successfully: ${data}`))
  .catch((e) => console.log(e));
};


// Exercise 4:  Multiple Operators
//Use the $and operator to create multiple conditions.
//Using the $in operator filter the cuisines that are "Bakery", "Chicken", "Hamburgers", "American"
//Using the $ne operator filter out the documents that have city "Brooklyn"
//Using the $gt operator include only documents that have restaurant_Id greater than 4000000
//Exclude columns _id.  Include cuisine, name, city, restaurtant_id
//Sort Descending on restaurant_id

const multipleOp = () => {
  console.log("Filtering Cuisines using multiple operators...");

  Restaurant
  .find(
    { $and: [ { "cuisine": {$in: ["Bakery", "Chicken", "Hamburgers", "American" ]} }, 
              { 'city': {$ne: 'Brooklyn'} },
              { 'restaurant_id': {$gt: 4000000}} ] },
    { '_id': 0, 'cuisine': 1, 'name': 1, 'city': 1, 'restaurtant_id': 1 }
    )
  .sort({ 'restaurtant_id': -1 })
  .then((data) => console.log(`Filtered data successfully: ${data}`))
  .catch((e) => console.log(e));
};



// insertData();
findData();
// filter();
// taskEqual();
// equalAnd();
// multipleOp();




//Extra CRUD - Delete DB data
const deleteData = () => {
  console.log("deleting data from heroku");

  Restaurant.deleteMany({})
    .then(() => console.log("delete man successfull"))
    .catch(e => console.log(e));
};

// deleteData();