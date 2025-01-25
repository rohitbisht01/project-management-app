import mongoose from "mongoose";
import { config } from "./app.config";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(config.MONGO_URI);
    console.log(
      "Database successully connected to host: ",
      connection.connection.host
    );
  } catch (error) {
    console.log("Error connecting database", error);
    process.exit(1);
  }
};

export default connectDatabase;
