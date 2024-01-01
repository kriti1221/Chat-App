import mongoose from "mongoose";


async function connectUsingMongoose() {
    try {
        await mongoose.connect("mongodb://localhost:27017/chatApp");
        console.log("mongodb connected using mongoose")
    }
    catch (err) {
        console.log("Error connecting to the database: ", err)
    }
}

export default connectUsingMongoose;
