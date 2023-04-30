import NetSalary from "./netsalary.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EmployeeSchema = new Schema({
  avatar:{
    type:String
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  job_title: {
    type: String,
  },
  departement_id: {
    type: Schema.Types.ObjectId,
    ref: "Entreprise",
  },
  resetCode: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  hire_date: {
    type: Date,
  },
  phone: {
    type: String,
  },
  vacation: {
    type: Number,
  },
  sick: {
    type: Number,
  },

});



export default model("Employee", EmployeeSchema);

