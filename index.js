// Import packages
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_CONNECT_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
const app = express();
app.use(express.json());

// Connection
const port = process.env.PORT || 9001;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

app.get("/test", async (req, res) => {
  try {
    const database = client.db("sample_airbnb");
    const collection = database.collection("listingsAndReviews");

    const result = await collection.findOne({});
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
  connectToMongoDB();
});
