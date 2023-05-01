import mongoose from "mongoose";
const {Schema, model} = mongoose
const FormulaireSchema = new Schema({

    Email: {
        type: String,
        required:true
    },
    Domain :{
        type:String,
    },
    Experiance : {
        type:Number,
    },
    Permis :{
    type:Boolean,
    },
    Degree :{
        type:String,
        enum:["Bac","Licence","Master","Doctorat"]
    },
    Competances:{
        type:String,

    },
    Langeges:{
        type:String,
    }
})
export default model ('Formulaire',FormulaireSchema)
