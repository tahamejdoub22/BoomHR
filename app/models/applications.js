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

applicationSchema.virtual("jobTitle", {
  ref: "Job",
  localField: "job",
  foreignField: "_id",
  justOne: true,
  autopopulate: true,
  select: "jobTitle"
});

const Application = model("Application", applicationSchema);

export default Application;
