require('dotenv').config();
const { MongoClient } = require('mongodb');

async function test() {
  console.log("Node version:", process.version);
  console.log("MongoDB URI loaded:", !!process.env.MONGODB_URI);

  try {
    const client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();
    console.log("✅ Connected to MongoDB");

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping successful");

    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:");
    console.error(err);
  }
}

test();