const jwt = require("jsonwebtoken")



const auth = (req, res, next) => {
   const token = req.headers.authorization.split(" ")[1];
     
   try {
      if (!token) {
         return res.status(401).json({ message: "User not logged in" });
      }
     const decoded = jwt.verify(token, "Red");
     req.body.userId = decoded.userid; // Attach userId to the request body
     next();
   } catch (error) {
     return res.status(403).json({ message: "Invalid token" });
   }
 };
 
module.exports = auth;
