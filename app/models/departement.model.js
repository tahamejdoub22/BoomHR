import mongoose from "mongoose";

const { Schema } = mongoose;

const departementSchema = new Schema({
  name: String,
  description: String,
  employeId: {
    type: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
    default: [],
  },
  chefId: {
    type: String,
    default: "",
  },
});

const Departement = mongoose.model("Departement", departementSchema);

export default Departement;
