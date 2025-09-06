const express = require("express");
const JobseekerRouter = express.Router();
const {checkRole,authoriazation}=require("../Middlewares/Authorization.js")
const {TokenValidators,validateMiddleware}=require("../Validatros/authValidators.js")
const { ViewAllJobs,ApplyForJob, GetMyApplications } = require("../Controllers/JobseekerController.js")
JobseekerRouter.get(
  "/jobs",
authoriazation,
  checkRole("JobSeeker"),
  ViewAllJobs
);



JobseekerRouter.post("/jobs/:id/apply", authoriazation, checkRole("JobSeeker"), ApplyForJob)
JobseekerRouter.get("/my-applications",authoriazation, checkRole("JobSeeker"), GetMyApplications);

module.exports = {JobseekerRouter};







