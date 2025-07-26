import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    //connect to database
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log("MONGODB CONNECTED SUCCESFULLY")
  } catch (error) {
    console.error("FAILED TO CONNECT TO MONGODB" , error)
    process.exit(1)
  }
}

export default connectDB