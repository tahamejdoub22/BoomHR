import mongoose from "mongoose";
const {Schema, model} = mongoose
const CondidatSchema = new Schema({
    email:{
        type:String,
        unique:true
    },
    password :{
        type:String,
    }
});
export default model ('Condidat',CondidatSchema)
