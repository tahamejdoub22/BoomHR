import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      default: []
    }
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      default: []
    }
  ],
  projectManager: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }
});

const Project = mongoose.model('project', projectSchema);

export default Project;