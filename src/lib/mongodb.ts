import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://soondorob02:51FpkOI8iuRaPU7B@project1.xyzo31j.mongodb.net/?retryWrites=true&w=majority&appName=project1";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri);
  (global as any)._mongoClientPromise = client.connect();
}
clientPromise = (global as any)._mongoClientPromise;

export default clientPromise; 