import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1wlsias.mongodb.net`;

async function dbConnect() {
  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
  });
  
  return db;
}

export default dbConnect;
