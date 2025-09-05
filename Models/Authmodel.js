const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  username: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  role: { type: String, enum: ["Recruiter", "JobSeeker"] },
 
},{timestamps:true});
const UserModel = mongoose.model("Users", authSchema);
module.exports = { UserModel };









































