const nodemailer = require("nodemailer");
const User = require("../models/user.model.js") 
const bcrypt = require ("bcryptjs")
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
    pass:'mhjgvbgureynfafw'
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