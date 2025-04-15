import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

// Graceful shutdown when the app is terminated
// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   console.log("MongoDB connection closed due to app termination");
//   process.exit(0);
// });
