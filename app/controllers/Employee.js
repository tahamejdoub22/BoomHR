// import Employee from "../models/Employee.js";
// import Entrprise from "../models/Entrprise.js";
// import bcrypt from "bcryptjs";
// import mailgun from "mailgun-js";

// const MAILGUN_APIKEY='d17c7d4b743997929f3a25368456b7c1-52d193a0-b5be22dd' ;
// const DOMAIN = 'sandbox18d6f0d88e6d4df38f05bf89e15a1677.mailgun.org';
// const mg = mailgun({apiKey: MAILGUN_APIKEY, domain: DOMAIN});
// export function Login(req , res){
//     const email = req.body.email;
//     const password = req.body.password;
//     const idEnpr = 0;
//     // Find user by email
//     Employee.findOne({ email }).then(emp => {
//         // Check if user exists
//         if (!emp) {
//             return res.status(404).json({   message: "Email is not Registered Please SignUp",
//                 status: res.statusCode});
//         }

//         // Check password
//         bcrypt.compare(password, emp.password).then(isMatch => {
//             if (password==emp.password) {
//                 Entrprise.findById(emp.departement_id).then(async (Entr) =>{
//                     if(!Entr)
//                     return res.status(404).json(null)
//                     else
//                     return res.status(200).json({
//                         nom:emp.first_name,
//                         prenom:emp.last_name,
//                         salary:emp.salary,
//                         vacation:emp.vacation,
//                         sick:emp.sick,
//                         Enom:Entr.Nom,
//                         localisation:Entr.Localisation
//                     })
//                 })
//             }
//             else {
//                 return res
//                     .status(400)
//                     .json({ message: "Invalid password",
//                         status: res.statusCode});
//             }
//         });
//     });
// }
// export function ForgetPassword(req, res) {
//     const email = req.body.email;

//     // Find user by email
//     Employee.findOne({ email }).then(async (emp) => {
//         if (!emp) {
//             return res.status(404).json({
//                 message: "Email is not registered. Please sign up.",
//                 status: res.statusCode,
//             });
//         }

//         const randomInt = Math.floor(Math.random() * 1000) + 1000;
//         console.log(randomInt);
//         emp.resetCode = randomInt;
//         await emp.save().catch((err) => console.log(err));

//         const message = {
//             from: "support@BoomHR.tn",
//             to: email,
//             subject: "Password reset",
//             html: `
//         <p>You are receiving this email because you (or someone else) have requested to reset the password for your account.</p>
//         <p>This your code : ${randomInt}</p>
//         <p>If you did not request to reset your password, you can ignore this email.</p>
//       `,
//         };

//         mg.messages().send(message);
//         return res
//             .status(200)
//             .json({ message: "Mail sent. Please check your email.", emp });
//     }).catch((err) => {
//         console.log(err);
//         return res.status(500).json({
//             message: "An error occurred while processing your request.",
//             status: res.statusCode,
//         });
//     });
// }

// export function verif(req,res)
// {
//     const email = req.body.email;
//     const code = req.body.resetCode;
//     Employee.findOne({email}).then(emp =>{
//         if( emp.resetCode==code){
//             return res.status(200).json(emp)
//         }
//         else
//             return res.status(500).json(emp)
//     })
// }
// export function resetPassword(req,res)
// {
//     const newPass = req.body.pwd;
//     const email = req.body.email;
//     Employee.findOne({email}).then(async (emp) =>{
//         if(!emp){
//             return res.status(500);
//         }
//         else
//             emp.password=newPass
//             await emp.save().catch((err) => console.log(err));
//             return res.status(200).json(emp)
//     })
// }
// export function getEmployee(req,res)
// {
//     const idEmp = req.body.idEmp;
//     const idEnpr = req.body.idEnpr;

//     Employee.findById(idEmp).then(async (emp) =>{
//         if(!emp){
//             return res.status(500).json(null);
//         }
//         else{
//             Entrprise.findById(idEnpr).then(async (Entr) =>{
//                 if(!Entr)
//                     return res.status(404).json(null)
//                 else
//                 return res.status(200).json({
//                     nom:emp.first_name,
//                     prenom:emp.last_name,
//                     salary:emp.salary,
//                     vacation:emp.vacation,
//                     sick:emp.sick,
//                     Enom:Entr.Nom,
//                     localisation:Entr.Localisation
//                 })
//             })

//         }
//     })
// }
// export async function add (req,res)
// {
//    const  newEntr = new Entrprise(
//        {
//            Nom:req.body.name,
//            Localisation: req.body.localisation
//        });
//        await newEntr.save().then(entr=>res.json(entr)).catch(err => console.log(err));

// }
