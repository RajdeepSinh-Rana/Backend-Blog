const mongoose=require("mongoose")

const server=async()=>{
try {
    await mongoose.connect("mongodb+srv://Rajdeep:Rajdeep@project.rv8es.mongodb.net/blog?retryWrites=true&w=majority&appName=Project")
    console.log("Connected to MongoDB")
} catch (error) {
    console.log("Error connecting to MongoDB")   
}
}

module.exports=server