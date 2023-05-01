import mongoose from "mongoose";

const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
   
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    },  
    checkInTime: {
      type: Date,
      required: true,
    },
    checkOutTime: {
      type: Date,
      default: null,
    },
    location: {
      type:String,
      default: null,


    },
    totalWorkTime: {
      type: Number,
    },
    totalWorkTimeever: {
      type: Number,
      default: 0,
    },
    attendance_history: {
      type: String,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
