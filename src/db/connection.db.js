import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI;

    const result = await mongoose.connect(uri);
    console.log(`DB connected successfully 😎`);
  } catch (error) {
    console.log(`Fail to connect on DB `, error);
  }
};
export default connectDB;
