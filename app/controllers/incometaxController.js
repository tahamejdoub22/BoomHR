import Attendance from "../models/attendance.js";
import Employee from "../models/Employee.js";
import GrossSalary from "../models/GrossSalary.js";
import IncomeTax from "../models/IncomeTax.js";
import { Deduction } from "../models/deduction.js";

const createIncomeTax = async (req, res) => {
  try {
    const { grossSalaryId } = req.params;

    const incomeTax = new IncomeTax({
      grossSalary_id: grossSalaryId,
    });

    await incomeTax.save();

    res.status(201).json({
      success: true,
      data: incomeTax,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
// GET /deductions
async function getAlltax(req, res, next) {
    try {
      const IncomeTaxs = await IncomeTax.find().populate('grossSalary_id', 'grossSalary').populate('grossSalary_id', 'month') .populate('grossSalary_id', 'year')   .populate({ path: 'grossSalary_id', populate: { path: 'employee_id', select: 'first_name last_name' }});

      res.status(200).json(IncomeTaxs);
    } catch (err) {
      next(err);
    }
  }
  async function getIncomeTaxByGrossSalary(req, res, next) {
    try {
      const grossSalaryId = req.params.grossSalaryId; // or however you want to retrieve the grossSalaryId parameter
      const incomeTaxes = await IncomeTax.find({
        grossSalary_id: grossSalaryId,
      }).populate('grossSalary_id','grossSalary');
  
      if (incomeTaxes.length === 0) {
        throw new Error('Income taxes not found');
      }
  
      res.status(200).json(incomeTaxes);
    } catch (err) {
      next(err);
    }
  }

  
  
export { createIncomeTax,getAlltax,getIncomeTaxByGrossSalary };
