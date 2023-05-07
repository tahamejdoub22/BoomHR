

import mongoose from "mongoose";

const { Schema, model } = mongoose;
const statusSchema = new Schema({
    type: String,
    enum: ['opened', 'closed'],
    default: 'opened'  
});

const Job = model("Status", statusSchema);

export default Status;
