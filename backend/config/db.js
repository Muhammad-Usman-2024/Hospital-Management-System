import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(
      `${process.env.MONGODB_URI}
        `,
      { dbName: "HMS_WEB_APP" }
    );
    console.log("Database is connected successfully.");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
