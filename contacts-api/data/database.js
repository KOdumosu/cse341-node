const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let database;

async function initDb() {
  if (database) {
    return database;
  }

  await client.connect();
  database = client.db("cse341");
  console.log("Connected to MongoDB");
  return database;
}

function getDb() {
  if (!database) {
    throw new Error("Database not initialized");
  }

  return database;
}

module.exports = {
  initDb,
  getDb,
};