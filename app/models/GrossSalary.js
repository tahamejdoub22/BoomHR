import Benefit from "./benefit.js";
import Employee from "./Employee.js";
import IncomeTax from "./IncomeTax.js";
import NetSalary from "./netsalary.js";
import mongoose from "mongoose";
import { Deduction } from "./deduction.js";

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
);
grossSalarySchema.pre('remove', async function (next) {
  try {
    await this.model('NetSalary').deleteMany({ grossSalary_id: this._id });
    await this.model('Deduction').deleteMany({ grossSalary_id: this._id });
    await this.model('Benefit').deleteMany({ grossSalaryId: this._id });
    await this.model('IncomeTax').deleteMany({ grossSalary_id: this._id });

    next();
  } catch (err) {
    next(err);
  }
});

const GrossSalary = mongoose.model('GrossSalary', grossSalarySchema);

export default GrossSalary;
