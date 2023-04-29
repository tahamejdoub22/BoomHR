//const mongoose = require("mongoose");



// const emplyer = mongoose.model(
//     "employer",
//     new mongoose.Schema({


//    fullname: {
//         type: String,
//         required: true,
//     },
//     picture: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: Number,
//         required: true,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         required: true,
//     },
//     salary: {
//         type: Number,
//         required: true,
//     },
//     jobtitle: {
//         type: String,
//         required: true,
//     },
//     jobtype: {
//         type: String,
//         required: true,
//     },
//     departement: {
//        type :String , 
//     },
//     firstday: {
//         type: Date,
//         required: true,
//     },
//     lastday: {
//         type: Date,
//         required: true,
//     },
//     dateofbirth: {
//         type: Date,
//         required: true,
//     },
  
    
// })
// );

// module.exports = emplyer;
const mongoose = require("mongoose");

const depatement = require("./departement.model");

const emplyerSchema = new mongoose.Schema({


   fullname: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    jobtype: {
        type: String,
        required: true,
    },
    departement: {
       type :String , 
    },
    firstday: {
        type: Date,
        required: true,
    },
    lastday: {
        type: Date,
        required: true,
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
  
    
});


emplyerSchema.pre("remove", async function (next) {
    try {
        const employee = this;
        const department = await depatement.findOne({ employeId: employee._id });

        if (department) {
            department.employeId = department.employeId.filter(id => id.toString() !== employee._id.toString());
            department._v = department.v > 0 ? department._v - 1 : 0;
            await department.save();
        }

        next();
    } catch (err) {
        next(err);
    }
});
const emplyer = mongoose.model("employer", emplyerSchema);

module.exports = emplyer;