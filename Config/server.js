require('dotenv').config();
const mongoose=require("mongoose")

const server=async()=>{
try {
    await mongoose.connect(process.env.db)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log("Error connecting to MongoDB")   
}
}

module.exports=server