// const mongoose = require("mongoose");

// const departement = mongoose.model(
//   "depatement",
//   new mongoose.Schema({
//     name: String,
//     description: String,
//     employeId:
//     {
//         type: [String],
//         default: [],

//     },
//     chefId:
//     {
//         type: String,
//         default: "",
//     }
   
//   })
// );

// module.exports = departement;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departementSchema = new Schema({
    name: String,
    description: String,
    employeId: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "employer",
            },
        ],
        default: [],
    },
    chefId: {
        type: String,
        default: "",
    }
});

const departement = mongoose.model("depatement", departementSchema);
module.exports = departement;