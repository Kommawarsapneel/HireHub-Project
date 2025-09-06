// const mongoose = require("mongoose");
// const {JobModel}=require("../Models/JobsModel")
// const  Application=require("../Models/Applictionsmodel")

// const ViewAllJobss = async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { ViewAllJobss}
const mongoose = require("mongoose");
const {JobModel}=require("../Models/JobsModel")
const  Application=require("../Models/Applictionsmodel")
// ✅ Get all jobs
const ViewAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// / ✅ Apply for a job
const ApplyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id; // from token

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({ jobId, userId });
    if (existing) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = new Application({
      jobId,
      userId,
      status: "Applied"
    });

    await application.save();
    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ------------------getmyApplications
const GetMyApplications = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT token

    const applications = await Application.find({ userId })
      .populate("jobId") // populate job details
      .populate("userId", "name email"); // optional: populate user info

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { ViewAllJobs,ApplyForJob,GetMyApplications}























































