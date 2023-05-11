import mongoose from "mongoose";

const { Schema } = mongoose;

const salarySchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    month: {
      type: Date,
      required: true,
    },
    totaltimeworktotalmonth: { // updated field name
      type: Number,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;

