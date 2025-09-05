const bcrypt = require("bcryptjs");
const { UserModel } = require("../Models/Authmodel");
const { sign } = require("crypto");
const jwt=require("jsonwebtoken");
const { access } = require("fs");
const signupController=async(req,res,next)=>{
    try {
         const { name, username, email, password, role } = req.body;
          const hashpassword = await bcrypt.hash(password, 12);

           const user = await UserModel.create({
      name: name,  
      username: username,
      email: email,
      password: hashpassword,
      role:role
      
    });
    // const results=  user.save()
    res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message || "Something went wrong" }); 
    }
}
const loginController=async(req,res)=>{
 try{
const{email,password}=req.body;
const dbDetails= await UserModel.findOne({email:email});
if(!dbDetails){
  res.status(400).json("Details Required");
}
else{
    const isMatch= await bcrypt.compare(password,dbDetails.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    else{
        const token=jwt.sign({id:dbDetails._id,
            username:dbDetails.username,
            role:dbDetails.role
        },process.env.secert_key,{algorithm:"HS256",expiresIn:"24h"}
    );
    res.status(200).json({
        name:dbDetails.name,
        username:dbDetails.username,
        Email:dbDetails.email,
        role:dbDetails.role,
        accessToken:token
    })
    }
 }
 }
 catch(error){
    res.status(400).json(error.message)
 }
}
module.exports={signupController,loginController}


























































