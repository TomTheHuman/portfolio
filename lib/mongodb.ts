import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI env variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalAny: any = global;

let cached: MongooseCache = globalAny.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  globalAny.mongoose = cached;
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI env variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mong) => mong);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
