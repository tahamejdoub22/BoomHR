const nodemailer = require("nodemailer");
const User = require("../models/user.model.js") 
const bcrypt = require ("bcryptjs")
const cron = require('node-cron');
const Employer = require("../models/employer.model.js") 
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.HrManagerBoard = (req, res) => {
  res.status(200).send("HrManager Content.");
};
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'boomhr4@gmail.com',
    pass:'otyssaxeiauksgwp'
  }
});

exports.forgotPassword= (req, res) => {
  const { email } = req.body;
  User.findOne({

    email: email

  }).then((user) => {
    if (!user) {
      return res.status(404).json({ "message": "User doesn't exist" });
    }

    //check if cookie exists

    const otp = Math.floor(100000 + Math.random() * 900000)

    var mailOptions = {
      from: 'boomhr4@gmail.com',
      to: email,
      subject: 'Reset password',
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
                <h1>Reset your password</h1>
                </head>
              <body>
              <h2>Hi </h2>
              <p>Please use the following code to reset your password</p>
              <P>  ${otp} </P>
                </body>`
    };
   

    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
    
      }
    });


    //jwt token for otp
    user.otp = otp;
    user.save();

    res.status(200).json({ "message": "Email sent" });
  }
  )
    .catch((err) => {
      res.json({ "message": err.message });
    }
    );
}

exports.verifyOtp= (req, res) => {
  const { email, otp } = req.body;

  User.findOne({
    email: email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ "message": "User doesn't exist" });
      }
      else {
        if (user.otp == otp) {
          res.status(200).json({ "message": "OTP verified" });
        }
        else {
          res.status(400).json({ "message": "Incorrect OTP" });
        }
      }
    })
    .catch((err) => {
      res.json({ "message": err.message });
    });
}

exports.resetPassword = (req, res) =>{
  const { email, otp, newPassword } = req.body;

  User.findOne({


    email: email,


  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ "message": "User doesn't exist" });
      }
      else {
        if (user.otp == otp) {
          bcrypt.hash(newPassword, 12).then((hashedpassword) => {
            user.password = hashedpassword;
            user.otp = 0;
            user.save();
            res.status(200).json({ "message": "Password changed" });
          });
        }
        else {
          res.status(400).json({ "message": "Incorrect OTP" });
        }
      }
    })
    .catch((err) => {
      res.json({ "message": err.message });
    });
}




  function myFunction() {
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
//setInterval(()=> myFunction(),100000)

const testScheduledDate = '00 54 13 17 4 * 2023'; // 10:00 am on April 4th, 2023

cron.schedule(testScheduledDate, () => {
  myFunction();
}, {
  scheduled: true,
  timezone: "Africa/Tunis" // set your timezone here
});


async function myFunction2() {
  // Get the current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

  // Find employees whose birthday is today
  const employees = await Employer.find({ dateofbirth: `${currentDay}/${currentMonth}` });

  // Send a birthday email to each employee
  employees.forEach(employee => {
    const mailOptions = {
      from: 'boomhr4@gmail.com',
      to: employee.email,
      subject: 'Happy Birthday!',
      html: `<p>Dear ${employee.name},</p><p>Happy birthday! We hope you have a wonderful day.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(`Error sending email to ${employee.email}: ${error}`);
      } else {
        console.log(`Email sent to ${employee.email}: ${info.response}`);
      }
    });
  });
}

// Schedule the function to run at midnight every day
const scheduledTime = '0 0 0 * * *'; // midnight every day
cron.schedule(scheduledTime, () => {
  myFunction2();
}, {
  scheduled: true,
  timezone: "Africa/Tunis" // set your timezone here
});


