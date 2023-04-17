import mongoose from "mongoose";

const { Schema } = mongoose;

const grossSalarySchema = new Schema(
  {
      
        employee_id: {
          type: Schema.Types.ObjectId,
          ref: 'Employee'
        },
        year: {
          type: Number,
          required: true,
        },
        month: {
          type: Number,
          required: true,
          min: 1,
          max: 12,
        },
        hourlyRate: {
          type: Number,
          required: true,
          default: 10,
        },
        totalWorkTime: {
          type: Number,
        },
        grossSalary: {
          type: Number,
          required: true,
        },
      },
      {
        timestamps: true,
      },
)

const GrossSalary = mongoose.model('GrossSalary', grossSalarySchema);

export default GrossSalary;
