import mongoose from "mongoose";

const { Schema } = mongoose;

const BenefitSchema = new Schema(
  {
  
    grossSalaryId: {
      type: Schema.Types.ObjectId,
      ref: 'GrossSalary',
      required: true,
    },
    benefitType: {
      type: String,
      enum: ['health', 'dental', 'vision', 'life'],
      required: true,
    },
    coverage: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Benefit = mongoose.model('Benefit', BenefitSchema);

export default Benefit;
