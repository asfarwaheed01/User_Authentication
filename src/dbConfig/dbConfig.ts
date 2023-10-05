import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB Connected Successfully");
        })
        connection.on('error',(err)=>{
            console.log("Error Connecting to MongoDB"+err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}