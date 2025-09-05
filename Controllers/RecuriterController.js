const {JobModel}=require("../Models/JobsModel")
const {}=require("../Models/viewalljobsRmodel")
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
function ViewJobById(req,res){
    res.send("View by Id")
}
module.exports={createapi,viewallJobs,ViewJobById}