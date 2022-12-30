import express from "express";
import { Db, MongoClient } from "mongodb";
import * as dotenv from 'dotenv'
dotenv.config()
// const express = require("express");
const app = express();

const PORT = process.env.PORT; // Auto assign PORT

// connecting mongodb with node

// const MONGO_URL = 'mongodb://127.0.0.1';
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // like dialing number in the phone
// top level await (this is new feauture) if await is in the function we want to use async await if it is not in the function we can use await instead of async await
await client.connect(); // its like pressing call button after dialing number in the phone
console.log("Mongo is connected !!!");




app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});


app.get("/movies", async function (request, response) {


  // Curson = Pagination |  Cursor -> Array | toArray()
  const movies = await client.db('b40wd').collection('movies').find({}).toArray();
  console.log(movies);
    response.send(movies);
  });
  

  app.get("/movies/:id", async function (request, response) {
    const {id} = request.params; //object destructuring

    // Db.movies.findOne({id: '100'}) // => this is mongo db command line but we want to change this to node version because node doesn't understand mongo commands
 
  
    // const movie = movies.find((mv) => mv.id === id);

    const movie = await client.db('b40wd').collection('movies').findOne({id: id}); // converted the mongo db command line to node version

    // response.send(movie);




    movie 
    ? response.send(movie) 
    : response.status(404).send({message: "movie not found"});
  });

// posting

// app.post("/movies", express.json(), async function (request, response) { actually this is with express.json() because mongo didnt know whether it want to be json so just use as global we are using app.use(express.json()) line no 113

  app.post("/movies", async function (request, response) {
    const data = request.body;
    // console.log(data);
    const result = await client.db('b40wd').collection('movies').insertMany(data); // converted the mongo db command line to node version

   response.send(result);
  });


  // Delete

  app.delete("/movies/:id", async function (request, response) {
    const {id} = request.params;
    const movie = await client.db('b40wd').collection('movies').deleteOne({id: id}); 

    console.log(result);
    result.deletedCount > 0
     movie 
    ? response.send({message: "move deleted successfully"}) 
    : response.status(404).send({message: "movie not found"});
  });


  app.put("/movies/:id", async function (request, response) {
    const {id} = request.params;
    const data = request.body;
    const movie = await client.db('b40wd').collection('movies').updateOne({id: id}, {$set: data}); 

    console.log(result);

     
  });

  app.get("/movies", async function (request, response) {
    if (request.query.rating){
      request.query.rating = +request.query.rating;
    }

    console.log(request.query);

    const movies = await client.db('b40wd').collection('movies').find(request.query).toArray(); 

    // console.log(request.query);
response.send(movies);
     
  });


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
