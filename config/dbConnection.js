import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "mycontacts_database" });
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    process.exit(1); 
  }
};
