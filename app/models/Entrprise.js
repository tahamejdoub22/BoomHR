import mongoose from "mongoose";
const {Schema, model} = mongoose
const EntrpriseSchema = new Schema({
    Nom:{
        type:String,
    },
    Localisation :{
        type:String,
    }
})
export default model ('Entreprise',EntrpriseSchema)
