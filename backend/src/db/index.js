import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'
const connectDB = async ()=>{
    const URI = process.env.MONGODB_URI;    
    try{
       const connectionInstance = await mongoose.connect(`${URI}/${DB_NAME}`)
       console.log("MONGODB Connected: ", connectionInstance.connection.host);
    }catch(error){
        console.log("Error: ",error);
        process.exit(1)
    }
}

export default connectDB;