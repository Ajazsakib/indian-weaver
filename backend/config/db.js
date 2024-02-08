import mongoose from "mongoose";
import 'dotenv/config'
export const connectDB = async () =>
{
  const password = "S1s2s3s4@12"

  try {
    const con = await mongoose.connect(`mongodb+srv://saquibajaz999:${encodeURIComponent(password)}@cluster0.dx1z4wy.mongodb.net/IndianWeaver`);
    console.log(`Mongo DB Connected ${con.connection.host}`)
  }
  catch (error) {
    console.log("Error", error);
    process.exit(1)
  }
}

export default connectDB;