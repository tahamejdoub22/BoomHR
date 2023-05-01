import mongoose from "mongoose";
const {Schema, model} = mongoose
const CongeeSchema = new Schema({

    Employee_id: {
        type: Schema.Types.ObjectId,
        required:true
    },
    date_debut :{
        type:Date,
    },
    date_fin :{
    type:Date,
    },
    note :{
        type:String,
    },
    type:{
        type:String,
        enum:["vacation","sick"]
    },
    etat:{
        type:String,
        enum:["valide","non valide","en coure"],
        default:"en coure"
    }
})
export default model ('Congee',CongeeSchema)
