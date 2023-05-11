import mongoose from "mongoose";

const { Schema } = mongoose;

const StatusSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isOpened: {
    type: Boolean,
  }
});

export default mongoose.model('Status', StatusSchema);