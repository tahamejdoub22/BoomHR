import Department from "../models/departement.model.js";
import Employer from "../models/Employee.js";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import moment from 'moment-timezone';
import Employee from '../models/Employee.js'
const appMail = 'boomhr4@gmail.com' ;
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: appMail,
    pass: 'gkrtygpadhtycdqe' 
  }
});




function sendBirthdayEMail() {
  console.log("heeeeer");
  var mailOptions = {
    from: 'boomhr4@gmail.com',
    to: "lacht06@gmail.com",
    subject: ' Happy Birthday from BoomHR!',
    html: ` <style>
              .code {
                background-color: #4CAF50; /* Green */
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
              }
              </style>
              <head>
              <h1>Happy Birthday from BoomHR</h1>
              </head>
            <body>
            <p>Dear Mohamed </p>
            <p>Happy birthday! On behalf of everyone at BoomHR, I want to wish you a wonderful birthday filled with joy, laughter, and all your favorite things.

            We truly appreciate the hard work and dedication you bring to our team every day, and we hope that you have a fantastic year ahead. May this year be filled with success, personal growth, and many more happy memories.
            
            Once again, happy birthday! Enjoy your special day!
            Best regards,</p>
            <p>Mohamed</p>
            <p>BoomHR</p>
            

              </body>`
  };

  
   transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("sent");
    }
  });
console.log("here")
 
}


const testScheduledDate = '1 5 17 11 5 * 2023'; // test  envoyer mail  birhtday


cron.schedule(testScheduledDate, () => {
  
  sendBirthdayEMail();
}, {
  scheduled: true,
  timezone: "Africa/Tunis" // set your timezone here
});




cron.schedule('0 0 * * *', async () => {
  const now = moment().tz("Africa/Tunis");
  
  const employees = await Employee.find({
    dateofbirth: {
      $gte: now.startOf('day').toDate(),
      $lte: now.endOf('day').toDate()
    }
  });
  
  employees.forEach(employee => {
    sendBirthdayEmail(employee.email, employee.name);
  });
}, {
  scheduled: true,
  timezone: "Africa/Tunis"
});

function sendBirthdayEmail(email, name) {
  console.log(`Sending birthday email to ${name} at ${email}`);
}







// get all employes
export const getEmployes = async (req, res) => {
    try {
      const employes = await Employer.find(
        
      );
      res.status(200).json(employes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getEmployerById = async (req, res) => {
    try {
      const employer = await Employer.findById(req.params.id).populate("tasks");
      if (!employer) {
        return res.status(404).json({ message: "Employer not found" });
      }
      res.status(200).json(employer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const createEmploye = async (req, res) => {
    
    const newEmployer = new Employer({
        email: req.body.email,
        password:req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        job_title: req.body.job_title,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        hire_date: req.body.hire_date,
        phone: req.body.phone,
        address: req.body.address,
        department: req.body.department,
        dateofbirth: req.body.dateofbirth,
        sick: req.body.sick,
        vacation: req.body.vacation,
        avatar:   req.body.avatar,
        dateofbirth: req.body.dateofbirth,

      });    const newEmploye = new Employer(newEmployer);
    try {
      await newEmploye.save();

      const mailOptions = {
        from: appMail,
        to: newEmployer.email,
        subject: 'Welcome to the app',
        html: `<style>
                .code {
                  background-color: #4CAF50; /* Green */
                  border: none;
                  color: white;
                  padding: 15px 32px;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                }
              </style>
              <head>
                <h1>Welcome to the app</h1>
              </head>
              <body>
                <h2>Hi ${newEmployer.first_name},</h2>
                <p>Thank you for signing up for our app! Here are your login credentials:</p>
                <p>Email: ${newEmployer.email}</p>
                <p>Password: ${req.body.password}</p>
              </body>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending password reset email: ${error}`);
          return res.status(500).json({ message: 'Internal server error' });
        } else {
          return res.status(200).json({ message: 'Email sent' });
        }
      });

      res.status(201).json(newEmploye);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

// update one employe
export const updateEmploye = async (req, res) => {
    const { id } = req.params;
    const employe = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No employer with id: ${id}`);
    try {
      const updatedEmployer = await Employer.findByIdAndUpdate(id, { ...employe, id }, { new: true });
      res.json(updatedEmployer);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  
  export const deleteEmploye = async (req, res) => {
    const { id } = req.params;
    try {
      const employer = await Employer.findById(id);
      if (!employer) {
        return res.status(404).send(`No employer with id: ${id}`);
      }
      await employer.remove();
      res.json({ message: "Employer deleted successfully." });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  
  // delete multiple employers
  export const deleteEmployers = async (req, res) => {
    const { ids } = req.body;
    try {
      await Employer.deleteMany({ _id: { $in: ids } });
      res.json({ message: "Employers deleted successfully." });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
// create an employe and add it to the departement
export const createEmployerAndAddToDepartment = async (req, res) => {
    const { department } = req.body;
  
    const newEmployer = new Employer({
      avatar: req.body.avatar,
      email: req.body.email,
      password:req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      jobtitle: req.body.jobtitle,
      departement_id: req.body.departement_id,
      resetCode: req.body.resetCode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      hire_date: req.body.hire_date,
      phone: req.body.phone,
      address: req.body.address,
      sick: req.body.sick,
      fcmToken: req.body.fcmToken,
      vacation: req.body.vacation,
      salary: req.body.salary,
      jobtype: req.body.jobtype,
      department: req.body.department,
      firstday: req.body.firstday,
      lastday: req.body.lastday,
      dateofbirth: req.body.dateofbirth,
    });
  
    try {
      const dep = await Department.findOne({ name: department });
      console.log("2" + department);
  
      const doc = await newEmployer.save();
      dep.employeId.push(doc._id);
      await dep.save();
  
      res.status(201).json(doc);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };