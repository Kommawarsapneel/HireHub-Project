const express = require("express");
const Recruiterrouter = express.Router();
const {TokenValidators,validateMiddleware}=require("../Validatros/authValidators.js")
// const { authoriazation } = require("../Middlewares/Authorization.js");
const {checkRole,authoriazation}=require("../Middlewares/Authorization.js")
const {
  createapi,
  viewallJobs,
  ViewJobById,GetApplicationsForMyJobs
} = require("../Controllers/RecuriterController.js");

Recruiterrouter.post("/create",TokenValidators,validateMiddleware,authoriazation,checkRole("Recruiter"),createapi);
Recruiterrouter.get("/viewjobs",TokenValidators,validateMiddleware, authoriazation,checkRole("Recruiter"),viewallJobs);
// Recruiterrouter.get("/viewjobs/:id",authoriazation ,checkRole("Recruiter"),ViewJobById);
Recruiterrouter.get("/my-jobs/applications",authoriazation,checkRole("Recruiter"),GetApplicationsForMyJobs);
module.exports = { Recruiterrouter };