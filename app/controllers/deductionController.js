import { Deduction } from "../models/deduction.js";

// GET /deductions
async function getAllDeductions(req, res, next) {
  try {
    const deductions = await Deduction.find().populate('grossSalary_id', 'grossSalary') .populate({ path: 'grossSalary_id', populate: { path: 'employee_id', select: 'first_name last_name' }});;
    res.status(200).json(deductions);
  } catch (err) {
    next(err);
  }
}

// GET /deductions/:id
async function getDeductionById(req, res, next) {
  const { id } = req.params;
  try {
    const deduction = await Deduction.findById(id);
    if (!deduction) {
      return res.status(404).json({ message: 'Deduction not found' });
    }
    res.status(200).json(deduction);
  } catch (err) {
    next(err);
  }
}

// POST /deduction
async function createDeduction(req, res) {
    const { name, description } = req.body;
    const { grossSalary_id } = req.params;
  
    const deduction = new Deduction({ name, description, grossSalary_id });
  
    try {
      await deduction.save();
      const deductionAmount = deduction.deductionAmount; // get the calculated deduction amount from the model
      res.status(201).json({ deduction, deductionAmount });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
  
  
// PUT /deductions/:id
async function updateDeduction(req, res, next) {
  const { id } = req.params;
  const { name, description, grossSalary_id } = req.body;
  try {
    const deduction = await Deduction.findByIdAndUpdate(id, { name, description, grossSalary_id }, { new: true });
    if (!deduction) {
      return res.status(404).json({ message: 'Deduction not found' });
    }
    res.status(200).json(deduction);
  } catch (err) {
    next(err);
  }
}

// DELETE /deductions/:id
async function deleteDeduction(req, res, next) {
  const { id } = req.params;
  try {
    const deduction = await Deduction.findByIdAndDelete(id);
    if (!deduction) {
      return res.status(404).json({ message: 'Deduction not found' });
    }
    res.status(200).json({ message: 'Deduction deleted successfully' });
  } catch (err) {
    next(err);
  }
}
async function getdeductionByGrossSalary(req, res, next) {
  try {
    const grossSalaryId = req.params.grossSalaryId; // or however you want to retrieve the grossSalaryId parameter
    const deductions = await Deduction.find({
      grossSalary_id: grossSalaryId,
    }).populate('grossSalary_id','grossSalary');

    if (deductions.length === 0) {
      throw new Error('Deductions not found');
    }

    res.status(200).json(deductions);
  } catch (err) {
    next(err);
  }
}
export { getAllDeductions, getDeductionById, createDeduction, updateDeduction, deleteDeduction,getdeductionByGrossSalary };
