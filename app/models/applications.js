import mongoose from "mongoose";

const { Schema, model } = mongoose;

const applicationSchema = new Schema({
  candidate: {
     type: Schema.Types.ObjectId,
      ref: "Candidate" },
  job: {
     type: Schema.Types.ObjectId,
      ref: "Job" },
  dateApplied: { type: Date, default: Date.now },
  status: String,
  
});

const Application = model("Application", applicationSchema);

export default Application;
