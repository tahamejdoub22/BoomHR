import mongoose from "mongoose";

const { Schema, model } = mongoose;

const candidateSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  skills: String,
   
  jobs: [{ type: Schema.Types.ObjectId, 
        ref: "Job" }],
});

const Candidate = model("Candidate", candidateSchema);

export default Candidate;
 