import Benefit from "../models/benefit.js";
import Employee from "../models/Employee.js";
import GrossSalary from "../models/GrossSalary.js";
import IncomeTax from "../models/IncomeTax.js";
import NetSalary from "../models/netsalary.js";
import { Deduction } from "../models/deduction.js";

export const createNetSalary = async (req, res) => {
    try {
      const {
        grossSalary_id,
        incomeTax_id,
        deductions_id,
        benefits_id,
      } = req.body;
  
      const netSalary = new NetSalary({
        grossSalary_id,
        incomeTax_id,
        deductions_id,
        benefits_id,
      });
  
      await netSalary.populate([
        "grossSalary_id",
        "incomeTax_id",
        "deductions_id",
        "benefits_id",
      ]).execPopulate();
  
      await netSalary.save();
  
      res.status(201).json({
        message: "Net salary created successfully",
        data: {
          id: netSalary._id,
          grossSalary: netSalary.grossSalary_id,
          incomeTax: netSalary.incomeTax_id,
          deductions: netSalary.deductions_id,
          benefits: netSalary.benefits_id,
          netSalary: netSalary.netSalary,
          netSalaryAmount: netSalary.netSalary.toFixed(2),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Could not create net salary", error });
    }
  };
  export async function getAllnetsalary(req, res, next) {
    try {
      const netSalary = await NetSalary.find().populate('grossSalary_id', 'grossSalary').populate('grossSalary_id', 'month') .populate('grossSalary_id', 'year totalWorkTime')   .populate({ path: 'grossSalary_id', populate: { path: 'employee_id', select: 'first_name last_name' }})
      .populate('deductions_id','name rate ammount').populate('benefits_id','benefitType coverage amount').populate('incomeTax_id','taxRate taxAmount');

      res.status(200).json(netSalary);
    } catch (err) {
      next(err);
    }
  }