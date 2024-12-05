require('dotenv').config();

const exprees=require("express")
const cors=require("cors");
const server = require('./Config/server');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const UserRouter = require('./Router/UserRouter');
const BlogRouter = require('./Router/BlogRouter');

const app=exprees()

app.use(exprees.json())
app.use(cors())


app.use("/User",UserRouter)
app.use("/Blog",BlogRouter)

app.listen(process.env.Port,()=>{
    server()
    console.log(`server is running on port ${process.env.Port}`)
})