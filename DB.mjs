import mongoose from "mongoose";
import config from "./config/config.mjs"

 mongoose.connection.on("connected", () => {
 console.log("Mongoose connected to database!");
  });
  mongoose.connection.on("error",(err) => {
    console.error("Mongoose conecction error:", err);
  });
  mongoose.connection.on("disconnected",() => {
    console.log("Mongoose disconnected.");
  });

const DB = async () => {
  try {
     await mongoose.connect(config.MONGO_URI,{
       serverSelectionTimeoutMS: 3000,
        socketTimeoutMS: 45000,
     });
    console.log("Database conection established. staring server...")
  } catch (err) {
    console.error("Error connection to MOngoDB:", err);
    process.exit(1);
   }
};

export default DB;
