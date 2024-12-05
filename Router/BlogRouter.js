const exprees=require("express")
const { All, BlogAdd, GetMine, Delete, EditBlog, single, EditGet } = require("../Controler/Blogcontoler")
const auth = require("../Midelwar/auth")

const BlogRouter=exprees.Router()



BlogRouter.get("/All",All)
BlogRouter.get("/single/:id",single)
BlogRouter.post("/Add",auth,BlogAdd)
BlogRouter.get("/GetMine",auth,GetMine)
BlogRouter.delete("/Delete",auth,Delete)
BlogRouter.get("/EditGet/:id",auth,EditGet)
BlogRouter.patch("/EditBlog",auth,EditBlog)


module.exports=BlogRouter