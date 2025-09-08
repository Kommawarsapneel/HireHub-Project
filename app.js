const express= require("express");
const app =express()
const dotenv=require("dotenv");
dotenv.config();
const connectDatabase=require("./config/database.js")
const {Recruiterrouter}=require("./Routes/RecuriterRoutes.js")
const {JobseekerRouter}=require("./Routes/JobseekerRouter.js")
const cors=require("cors")
connectDatabase();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "hire-hub-project-fronted-5sm8.vercel.app"   // ✅ Added deployed frontend URL
    ]
}))
const {Router}=require("./Routes/authRoutes.js")
app.use(express.json());
app.use(express.urlencoded(true));
app.use("/auth",Router)
app.use("/recruiter",Recruiterrouter)
app.use("/jobseeker", JobseekerRouter);
const  errorhandling=(err,req,res,next)=>{
console.log(err)
res.json({statusCode:err.statusCode,message:err.message,errors:err.errors})
}
app.use(errorhandling)

app.listen(process.env.PORT,()=>console.log("server started on "+process.env.PORT));
























