const exprees=require("express")
const { Ragister, Login, ForgotPassword, Resetpassword } = require("../Controler/Usercontoler")

const UserRouter=exprees.Router()



UserRouter.post("/Ragister",Ragister)
UserRouter.post("/Login",Login)
UserRouter.post("/ForgotPassword",ForgotPassword)
UserRouter.post("/Resetpassword",Resetpassword)


module.exports=UserRouter