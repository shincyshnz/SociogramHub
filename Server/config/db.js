import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected", connection);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;