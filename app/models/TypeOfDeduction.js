import mongoose from "mongoose";

const typeOfDeductionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const TypeOfDeduction = mongoose.model('TypeOfDeduction', typeOfDeductionSchema);

export default TypeOfDeduction;
