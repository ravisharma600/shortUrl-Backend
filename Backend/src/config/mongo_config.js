import mongoose from "mongoose"
console.log(process.env.MONGO_URI)

const connectDB = async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected ${conn.connection.host}`);
    }catch(err){
        console.log(`Error ${err.message}`);
        process.exit(1)
    }
};

export default connectDB;