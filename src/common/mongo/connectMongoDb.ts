import { connect } from "mongoose";

export const connectToMongoDb = async () => {
  try {
    await connect(process.env.DB_URL!);
    console.log("Successful connection to MongoDB");
  } catch (error) {
    console.error("Error connection to MongoDB:", error);
  }
};
