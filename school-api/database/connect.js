const dns = require('dns');

// Force IPv4 resolution
dns.setDefaultResultOrder('ipv4first');

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: ServerApiVersion.v1,
});

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    db = client.db("schoolDB");
  }
  return db;
}

module.exports = connectDB;