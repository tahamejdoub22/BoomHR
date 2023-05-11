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
      const netSalary = await NetSalary.find().populate('grossSalary_id', 'grossSalary').populate('grossSalary_id', 'month') .populate('grossSalary_id', 'year totalWorkTime')   .populate({ path: 'grossSalary_id', populate: { path: 'employee_id', select: 'first_name last_name avatar' }})
      .populate('deductions_id','name rate ammount').populate('benefits_id','benefitType coverage amount').populate('incomeTax_id','taxRate taxAmount');

      res.status(200).json(netSalary);
    } catch (err) {
      next(err);
    }
  }
  export async function getNetSalaryById(req, res, next) {
    try {
      const { id } = req.params;
      const netSalary = await NetSalary.findById(id)
        .populate('grossSalary_id', 'grossSalary month year totalWorkTime')
        .populate({ path: 'grossSalary_id', populate: { path: 'employee_id', select: 'first_name last_name' }})
        .populate('deductions_id','name rate ammount').populate('benefits_id','benefitType coverage amount').populate('incomeTax_id','taxRate taxAmount');

      if (!netSalary) {
        return res.status(404).json({ message: 'Net salary not found' });
      }
  
      res.status(200).json(netSalary);
    } catch (err) {
      next(err);
    }
  }
  export async function getNetSalaryByEmployeeId(req, res, next) {
    try {
      const employeeId = req.params.employeeId;
      if (!employeeId) {
        return res.status(400).json({ message: 'Invalid employee ID' });
      }
      const netSalary = await NetSalary.find({ "grossSalary_id": employeeId })
        .populate('grossSalary_id', 'grossSalary month year totalWorkTime')
        .populate({ path: 'grossSalary_id',  populate: { path: 'employee_id', select: 'first_name last_name avatar' }})
        .populate('deductions_id','name rate ammount').populate('benefits_id','benefitType coverage amount').populate('incomeTax_id','taxRate taxAmount');
  
      if (netSalary.length === 0) {
        return res.status(404).json({ message: 'Net salary not found for employee ID' });
      }
  
      res.status(200).json(netSalary);
    } catch (err) {
      next(err);
    }
  }
  
  export async function getAllnetsalaryss(req, res, next) {
    try {
      const netSalaryData = await NetSalary.find()
        .populate({
          path: 'grossSalary_id',
          populate: {
            path: 'employee_id',
            select: 'first_name last_name avatar',
          },
          select: 'grossSalary totalWorkTime',
        })
        .populate({
          path: 'incomeTax_id',
          select: 'taxRate taxAmount',
        });
  
      const payrollData = netSalaryData.map((netSalary) => {
        const { grossSalary } = netSalary.grossSalary_id;
        const { taxRate, taxAmount } = netSalary.incomeTax_id;
  
        const grossSalaryAmount = parseFloat(grossSalary.toFixed(2));
        const totalWorkTime = parseFloat(grossSalary.totalWorkTime.toFixed(2));
        const netSalaryAmount = parseFloat(
          (grossSalaryAmount - taxAmount).toFixed(2)
        );
  
        return {
          grossSalary: {
            grossSalary: grossSalaryAmount,
            totalWorkTime: totalWorkTime,
          },
          netSalaryAmount: netSalaryAmount,
        };
      });
  
      res.status(200).json({ data: payrollData });
    } catch (err) {
      next(err);
    }
  }
  