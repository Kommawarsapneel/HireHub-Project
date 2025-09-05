const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const jobSchema = new Schema(
  {
    Company_Name: { type: String, required: true },
    Job_role: { type: String, required: true },
    Job_description: { type: String, required: true },
    Location: { type: String, default: "Not specified" },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
