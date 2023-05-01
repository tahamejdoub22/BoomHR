import mongoose from "mongoose";
const {Schema, model} = mongoose
const JobSchema = new Schema({
    domain:{
        type:String,
    },
    competances:{
        type:String,
    },
    entreprise_name :{
        type:String,
    },
})
export default model ('Job',JobSchema)
