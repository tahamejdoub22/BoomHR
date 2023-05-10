import mongoose from "mongoose";

const { Schema, model } = mongoose;

const netSalarySchema = new Schema(
  {

    grossSalary_id: {
      type: Schema.Types.ObjectId,
      ref: "GrossSalary",
      required: true,
    },
    incomeTax_id: {
      type: Schema.Types.ObjectId,
      ref: "IncomeTax",
      required: true,
    },
    deductions_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deduction",
        required: true,
      },
    ],
    benefits_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Benefit",
        required: true,
      },
    ],
    netSalaryAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

netSalarySchema.pre("save", async function (next) {
  try {
    const grossSalary = await this.model("GrossSalary").findById(
      this.grossSalary_id
    );
    const incomeTax = await this.model("IncomeTax").findById(this.incomeTax_id);
    const deductions = await this.model("Deduction").find({
      _id: { $in: this.deductions_id },
    });
    const benefits = await this.model("Benefit").find({
      _id: { $in: this.benefits_id },
    });
    let totalDeductions = 0;
    let totalBenefits = 0;

    for (let deduction of deductions) {
      totalDeductions += deduction.ammount;
    }

    for (let benefit of benefits) {
      totalBenefits += benefit.amount;
    }

    const taxableIncome = grossSalary.grossSalary - totalDeductions - totalBenefits;

    const taxRate = incomeTax.taxRate ;
    const taxAmount = taxRate * taxableIncome;

    const netSalary = taxableIncome - taxAmount;

    this.netSalary = netSalary;
    this.netSalaryAmount = netSalary.toFixed(2); // set the netSalaryAmount field to the net salary rounded to 2 decimal places
    next();
  } catch (error) {
    next(error);
  }
});

const NetSalary = model("NetSalary", netSalarySchema);

export default NetSalary;


