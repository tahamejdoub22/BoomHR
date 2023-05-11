import Candidate from "../models/candidate.js";
import Statuscan from "../models/statuscan.js";

export function getCandidatesWithJobRole(req, res) {
  Candidate.find()
    .populate("jobs", "jobRole")
    .populate("jobs", "jobTitle")
    .populate({ path: 'status', select: 'name' })

    // .select("name jobs")
    // .exec()
    .then((candidates) => {
      //  console.log("Candidates with job roles:", candidates);
      //  res.status(200).json(candidates);

      const modifiedCans = candidates.map((candidate) => {
        return {
          ...candidate._doc,
          candidates: candidate.jobs.length,
          status: candidate.status.name// use the name of the jobStatus
        }
      });
      res.status(200).json(modifiedCans);



    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });

}

//update User BYID

export function updateCandidate(req, res) {
  const { id } = req.params;
  const { name, email, phone, address, skills, status } = req.body;

  // Find the user by ID
  Candidate.findById(id)
    .then((candidate) => {
      // Update the user information
      candidate.name = name;
      candidate.email = email;
      candidate.phone = phone;
      candidate.address = address;
      candidate.skills = skills;
      return candidate.save();
    })
    .then((updatedCandidate) => {
      res.json(updatedCandidate);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    });
};



export async function postCannn(req, res) {
  try {
    const { name, email, phone, address, skills } = req.body;

    // Create a new applicant status object
    const applicantStatus = await Statuscan.findOne({ name: "new" });
    if (!applicantStatus) {
      throw new Error("Applicant status not found");
    }

    // Create a new candidate with applicant status
    const newCandidate = new Candidate({
      name: name,
      email: email,
      phone: phone,
      address: address,
      skills: skills,
      status: applicantStatus._id,
    });

    // Save the new candidate
    await newCandidate.save();

    // Return the name of the status in the response
    const responseCandidate = {
      ...newCandidate._doc,
      status: applicantStatus.name, // Include the name property of the applicant status
    };
    res.status(201).json(responseCandidate);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}


export function addCan(req, res) {
  Candidate.findOne({ email: req.body.email }).then((candidate) => {
    if (candidate) {
      res.status(400).json({ error: 'Candidate with this email already exists' });
    } else {
      Candidate.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        status: req.body.status,
        skills: req.body.skills,
        jobApplications: req.body.jobApplications,
        jobs: req.body.jobs,
      })
        .then((newCan) => {
          res.status(200).json({
            name: newCan.name,
            email: newCan.email,
            phone: newCan.phone,
            address: newCan.address,
            status: newCan.status,
            skills: newCan.skills,
            jobApplications: newCan.jobApplications,
            jobs: newCan.jobs,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
};



export function deleteCandidate(req, res) {
  const userId = req.params.id;

  // Find the user by ID and delete it
  Candidate.findOneAndDelete({ _id: userId })
    .then(deletedCandidate => {
      if (deletedCandidate) {
        res.status(200).json({ message: 'Candidate deleted', candidate: deletedCandidate });
      } else {
        res.status(404).json({ message: 'Candidate not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal server error', error: err });
    });
}





export function sendAcceptedEmail(req, res) {
  const candidateId = req.params.id;
  Candidate.findById(candidateId)
    .populate("status")
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      Statuscan.findOne({ name: "accepted" })
        .then((status) => {
          if (!status) {
            return res.status(500).json({ message: 'Status not found' });
          }
          candidate.status = status;
          return candidate.save();
        })
        .then((savedCandidate) => {
          const mailOptions = {
            from: '"Hr-Manager" <hrmangerp@gmail.com>', // sender address
            to: savedCandidate.email, // candidate email address
            subject: 'Congratulations! You have been accepted',
            text: `Dear ${savedCandidate.name},\n\nWe are delighted to inform you that you have been accepted for the position at our company. Please contact us to schedule a meeting to discuss the details.\n\nBest regards,\nHr-Manager`
          };
          return transporter.sendMail(mailOptions);
        })
        .then((info) => {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({ message: 'Candidate accepted' });
        })
        .catch((err) => {
          console.error(err.message);
          return res.status(500).send('Server error');
        });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send('Server error');
    });
}

export function sendRejectedEmail(req, res) {
  const candidateId = req.params.id;
  Candidate.findById(candidateId)
    .populate({
      path: 'jobs',
      select: 'jobTitle status'
    })
    .populate('status')
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      candidate.status.name = 'rejected';
      return candidate.save();
    })
    .then((savedCandidate) => {
      const mailOptions = {
        from: '"Hr-Manager" <hrmangerp@gmail.com>', // sender address
        to: savedCandidate.email, // candidate email address
        subject: 'Job Application Update',
        text: `Dear ${savedCandidate.name},\n\n
        Thank you for taking the time to apply. We appreciate your interest in our organization.

After careful consideration of your application, we regret to inform you that we will not be proceeding further with your candidacy. We received a large number of applications for this position and unfortunately, we are unable to offer you the role at this time.

We recognize that you have invested your time and effort in the interview process, and we want to express our sincere appreciation for your interest in our company. We are confident that your skills and experience will find a great match in the future.

Please do not hesitate to apply for future openings. We will keep your resume on file for future reference.

Thank you again for your interest in our organization, and we wish you the best of luck in your future endeavors.

\n\nBest regards,\nHr-Manager`
      };
      return transporter.sendMail(mailOptions);
    })
    .then((info) => {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Candidate rejected' });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send('Server error');
    });
}




import nodemailer from 'nodemailer';
import statuscan from "../models/statuscan.js";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hrmangerp@gmail.com', // replace with your email address
    pass: 'hvoxyigokbgfeuxx' // replace with your email password
  }
});



// function to send email
function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}


export function sendemailtoMeet(req, res) {
  Candidate.findById(req.params.id)
    .populate('jobs')
    .then(candidate => {
      if (!candidate) throw new Error('Candidate not found');
      const { date } = req.body; // Get the date from the request body
      const { selectedTime } = req.body;
      // const jobTitle = candidate.jobApplications[0].job.jobTitle;

      const jobDomain = candidate.jobs.length > 0 ? candidate.jobs[0].jobTitle : 'a position';
      //const meetLink = `https://meet.google.com/${generateMeetingCode()}`;
      const meetLink = `https://meet.google.com/${generateMeetingCode()}-`;



      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Hr-Manager" <hrmangerp@gmail.com>', // sender address
        to: candidate.email, // candidate email address
        subject: 'Interview Invitation', // Subject line
        //text: `Dear ${candidate.name},\n\nWe would like to invite you for an interview being ${candidate.status} on ${date}.\n\nPlease let us know your availability, and we will schedule a time that works for both of us.\n\nBest regards,\nHr-Manager`,
        // html: `<p>Dear ${candidate.name},</p><p>We would like to invite you for an interview for the position of ${jobDomain} being ${candidate.status} on ${date}.</p><p>Please let us know your availability, and we will schedule a time that works for both of us.</p><p>Best regards,<br/>Hr-Manager</p>`
        text: `Dear ${candidate.name},\n\nWe would like to invite you for an interview being ${candidate.status} on ${date}: ${selectedTime}: ${meetLink}..\n\nPlease let us know your availability, and we will schedule a time that works for both of us.\n\nBest regards,\nHr-Manager`,
        html: `<p>Dear ${candidate.name},</p><p>We would like to invite you for an interview being ${candidate.status} on ${date}:${selectedTime}.</p><p>Please let us know your availability, and we will schedule a time that works for both of us.
       <a href="${meetLink}">${meetLink}</a></p><p>Best regards,<br/>Hr-Manager</p>`
      };

      // send email and handle response with .then() and .catch()
      sendEmail(mailOptions)
        .then(info => {
          console.log('Message sent: %s', info.messageId);
          res.json(info)
          // res.send('Email sent successfully');
        })
        .catch(error => {
          console.log(error);
          res.send('Error sending email');
        });
    })
    .catch(error => {
      console.log(error);
      res.send('Error finding candidate');
    });
};

function generateMeetingCode() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
