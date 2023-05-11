import mongoose from "mongoose";

const { Schema } = mongoose;

const StatuscanSchema = new Schema({
  name: {
    type: String,
    required: true,
    default:"applicant",
    enum: ["new","applicant", "accepted", "rejected"]
 
  },


});

export default mongoose.model('Statuscan', StatuscanSchema);