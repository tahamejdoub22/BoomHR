import Benefit from "../models/benefit.js";
import GrossSalary from "../models/GrossSalary.js";

// Calculate benefit amount based on given parameters
export const calculateBenefitAmount = (coverage, grossSalary) => {
  return coverage * grossSalary;
};

export const createBenefit = async (req, res) => {
  try {
    // Validate input
    const {  grossSalaryId, benefitType, coverage } = req.body;
    if (  !grossSalaryId || !benefitType || !coverage) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Check if the benefit type is valid
    const validBenefitTypes = ['health', 'dental', 'vision', 'life'];
    if (!validBenefitTypes.includes(benefitType)) {
      return res.status(400).json({ message: 'Invalid benefit type' });
    }

    // Find the gross salary record by ID
    const grossSalary = await GrossSalary.findById(grossSalaryId);
    if (!grossSalary) {
      return res.status(404).json({ message: 'Gross salary not found' });
    }

    // Calculate the benefit amount based on the gross salary and coverage
    const benefitAmount = calculateBenefitAmount(coverage, grossSalary.grossSalary);

    // Create the new benefit record
    const newBenefit = new Benefit({
      grossSalaryId,
      benefitType,
      amount: benefitAmount, // Set the benefit amount to the calculated value
      coverage,
    });
    await newBenefit.save();

    res.status(201).json({ message: 'Benefit created successfully', benefit: newBenefit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export async function getAllbenefit(req, res, next) {
    try {
      const Benefits = await Benefit.find().populate('grossSalaryId', 'grossSalary').populate('grossSalaryId', 'month') .populate('grossSalaryId', 'year')   .populate({ path: 'grossSalaryId', populate: { path: 'employee_id', select: 'first_name last_name' }});

      res.status(200).json(Benefits);
    } catch (err) {
      next(err);
    }
  }
  export async function getbenefitByGrossSalary(req, res, next) {
    try {
      const grossSalaryId = req.params.grossSalaryId; // or however you want to retrieve the grossSalaryId parameter
      const benefits = await Benefit.find({
        grossSalaryId: grossSalaryId,
      }).populate('grossSalaryId','grossSalary');
  
      if (benefits.length === 0) {
        throw new Error('Deductions not found');
      }
  
      res.status(200).json(benefits);
    } catch (err) {
      next(err);
    }
  }