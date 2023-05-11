import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // changed from 'Emplyer'
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
    required: true,
  },
  status: {
    type: String,
    enum: ['to do', 'in progress', 'done'],
    default: "to do",
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;