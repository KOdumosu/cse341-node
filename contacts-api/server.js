require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;

console.log("MongoDB URI:", uri.replace(/\/\/.*?:.*?@/, "//<hidden>:<hidden>@"));

const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();

    console.log("Connected to MongoDB!");

    app.get("/", (req, res) => {
      res.send("Contacts API is running!");
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } 
  catch (err) {
  console.error("Failed to connect to MongoDB:");
  console.error(err);
  console.error(err.stack);
}
}

startServer();