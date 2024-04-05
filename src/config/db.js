import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successful connection to MongoDB");
  } catch (error) {
    console.error("Error connection to MongoDB:", error);
  }
};
