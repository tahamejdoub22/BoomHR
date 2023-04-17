import mongoose from "mongoose";

const { Schema } = mongoose;

const incomeTaxSchema = new Schema(
  {
  
   
    grossSalary_id: {
      type: Schema.Types.ObjectId,
      ref: 'GrossSalary',
      required: true,
    },
    taxRate: {
      type: Number,
      required: true,
      default: 0,
    },
    taxAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

incomeTaxSchema.pre('save', async function (next) {
  try {
    const grossSalary = await this.model('GrossSalary').findById(this.grossSalary_id);
    if (!grossSalary) {
      throw new Error('GrossSalary not found');
    }

    const annualGrossSalary = grossSalary.grossSalary * 12;
    if (annualGrossSalary <= 5000) {
      this.taxRate = 0;
    } else if (annualGrossSalary <= 20000) {
      this.taxRate = 0.2;
    } else if (annualGrossSalary <= 30000) {
      this.taxRate = 0.25;
    } else if (annualGrossSalary <= 50000) {
      this.taxRate = 0.3;
    } else {
      this.taxRate = 0.35;
    }

    this.taxAmount = grossSalary.grossSalary * this.taxRate;
    next();
  } catch (err) {
    next(err);
  }
});

const IncomeTax = mongoose.model('IncomeTax', incomeTaxSchema);

export default IncomeTax;




