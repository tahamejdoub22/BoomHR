import mongoose from "mongoose";

const {Schema, model} = mongoose
const PostSchema = new Schema({
    Email_condidate:{
        type:String,
    },
    path_cv:{
        type:String,
    }
})
export default model ('Post',PostSchema)