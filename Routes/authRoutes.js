const express=require("express")
const Router=express.Router()
const {loginController,signupController}=require("../Controllers/Authcontroller")
const {SignValidator,LoginValidators}=require("../Validatros/authValidators")
Router.post("/signup",SignValidator,signupController);
Router.post("/login",LoginValidators,loginController);
module.exports={Router}










