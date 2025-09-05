const express = require("express");
const Recruiterrouter = express.Router();
const {TokenValidators,validateMiddleware}=require("../Validatros/authValidators.js")
// const { authoriazation } = require("../Middlewares/Authorization.js");
const {checkRole,authoriazation}=require("../Middlewares/Authorization.js")
const {
  createapi,
  viewallJobs,
  ViewJobById,
} = require("../Controllers/RecuriterController.js");

Recruiterrouter.post("/create",TokenValidators,validateMiddleware,authoriazation,checkRole("Recruiter"),createapi);
Recruiterrouter.get("/viewjobs", authoriazation,checkRole("Recruiter"),viewallJobs);
Recruiterrouter.get("/viewjobs/:id",authoriazation ,checkRole("Recruiter"),ViewJobById);
module.exports = { Recruiterrouter };