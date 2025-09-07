const {JobModel}=require("../Models/JobsModel")
const mongoose = require("mongoose");
async function createapi(req, res) {
  try {
    const { Company_Name, Job_role, Job_description, Location, createdBy } = req.body;

    // Check required fields
    if (!Company_Name || !Job_role || !Job_description || !Location) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const data = new JobModel({
      Company_Name,
      Job_role,
      Job_description,
      Location,
      createdBy, // optional, only if you're passing logged-in user ID
    });

    await data.save();
    res.status(201).json({ message: "Job created successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function viewallJobs (req,res){
        try {
    const recruiterId = req.user.id; // comes from JWT (authorization middleware)

   const jobs = await JobModel.find();

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this recruiter" });
    }

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
// ------------------------------------ViewJobById
const ViewJobById = async (req, res) => {
  try {
    const recruiterId = req.user.id; // recruiter id from token

    const jobs = await JobModel.find({
      createdBy: new mongoose.Types.ObjectId(recruiterId)
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "You have not posted any jobs yet" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -------------------------GetApplicationsForMyJobs
const GetApplicationsForMyJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id; // recruiter id from token

    // Step 1: Find jobs created by this recruiter
    const jobs = await JobModel.find({ createdBy: recruiterId }).select("_id Job_role Company_Name");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "You haven't posted any jobs yet" });
    }

    const jobIds = jobs.map(job => job._id);

    // Step 2: Find applications for these jobs and populate related data
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("jobId", "Job_role Company_Name Location") // populate job details
      .populate("userId", "name email skills"); // populate jobseeker details

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications for your jobs yet" });
    }

    res.status(200).json({
      message: "Applications fetched successfully",
      applications
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports={createapi,viewallJobs,ViewJobById,GetApplicationsForMyJobs}