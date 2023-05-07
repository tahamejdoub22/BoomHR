

import mongoose from "mongoose";

const { Schema, model } = mongoose;
const jobSchema = new Schema({
  jobTitle: String,
  jobDomain: String,
  address: String,
  hiringLead: String,
  skillsRequired: String,
  postedDate: { type: Date, default: Date.now },
  department: String,
  jobStatus: [{
    type: Schema.Types.ObjectId,
    ref: 'Status'
  }], 
   applicants: Number,
  vacancies: Number,
  verified: Boolean,
  jobApplications: [{
     type: Schema.Types.ObjectId,
     ref: 'Application'
   }],
  candidates: [{
    type: Schema.Types.ObjectId,
    ref: 'Candidate'
  }]
});

const Job = model("Job", jobSchema);

export default Job;
