import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on("connected" , ()=>{
        console.log("Database connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/virtual-courses`)
    } catch (error) {
        console.log(`Error while connecting to database ${error}`)
    }
}

export 
{
    connectDB
}