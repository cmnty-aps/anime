import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise = null;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch((err) => {
        console.warn("MongoDB connection failed:", err.message);
        return null;
      });
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch((err) => {
      console.warn("MongoDB connection failed:", err.message);
      return null;
    });
  }
} else {
  console.warn("MongoDB not connected — MONGODB_URI is not set. Auth using fallback mode.");
}

export default clientPromise;