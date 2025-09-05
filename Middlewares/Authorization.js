const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {UserModel}=require("../Models/Authmodel")
dotenv.config();
// adding the authorization and authentcaion
async function authoriazation(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
       return res.status(400).json({ message: "Authorization header missing" });
    } else {
      const token = authHeader.split(" ")[1];
      if (!token) {
       return  res.status(400).json({ message: "Token Invalid" });
      } else {
       return  jwt.verify(token, process.env.secert_key, (err, decode) => {
          if (err) {
           return res.status(400).json({ message: "Check the token" });
          } else {
            req.user = decode;
            next();
          }
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid" });
  }return
}
//add checking the roles manager like  authorization
const checkRole = (...roles) => {
  // we are returning the function
  return async (req, res, next) => {
    //checking the user
    const user = req.user;
    //cross check
    const data = await UserModel.findById(user.id).select("role"); 
    //conosle.log(data) --> we can get the data matched
    // console.log(roles.includes(data.role))
    if (roles.includes(data.role)) {
      next();
    } else {
      next({ statusCode: 400, message: "Access denied" });
    }
  };
};
module.exports = { authoriazation, checkRole };