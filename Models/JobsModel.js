const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const JobsSchema = new Schema({
  Company_Name: { type: String, required: true },
  Job_role: { type: String, required: true },
  Job_description: { type: String, required: true },
  Location: { type: String,  },
  createdBy: { type: Types.ObjectId, ref: "Users" },
});
const JobModel = mongoose.model("Jobs", JobsSchema);
module.exports = { JobModel };
