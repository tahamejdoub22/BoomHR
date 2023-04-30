import mongoose from "mongoose";

const { Schema } = mongoose;

const deductionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  rate: {
    type: Number,
    default: function() {
      if (this.name === 'Social Security') {
        return 0.075;
      } else if (this.name === 'National Health Insurance') {
        return 0.015;
      } else {
        return 0; // default rate if deduction name is not recognized
      }
    }
  },
  ammount:{type:Number},
  grossSalary_id: {
    type: Schema.Types.ObjectId,
    ref: 'GrossSalary',
    required: true,
  },
});
deductionSchema.post('save', async function(doc, next) {
  try {
    const grossSalary = await mongoose.model('GrossSalary').findByIdAndUpdate(doc.grossSalary_id, { $push: { deductions: doc._id } }, { new: true });
    if (!grossSalary) {
      throw new Error('GrossSalary not found');
    }
    next();
  } catch (err) {
    next(err);
  }
});
deductionSchema.pre('save', async function() {
    const grossSalary = await mongoose.model('GrossSalary').findById(this.grossSalary_id);
    if (!grossSalary) {
      throw new Error('GrossSalary not found');
    }
    const salary = grossSalary.grossSalary;
    let rate = this.rate; // assign the rate to a variable first
    if (this.name === 'Social Security') {
      rate = 0.075; // update the rate based on the deduction name
    } else if (this.name === 'National Health Insurance') {
      rate = 0.015; // update the rate based on the deduction name
    }
    this.ammount = salary * rate; // calculate the deduction amount and set the 'ammount' property
  });

  

const Deduction = mongoose.model('Deduction', deductionSchema);

export { Deduction };
