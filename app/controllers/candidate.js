import Candidate from "../models/candidate.js";
import Statuscan from "../models/statuscan.js";


// export function getCandidatesWithJobRole(req, res) {
//   const jobRole = req.query.jobRole; // get job role from query string

//   Candidate.find({ jobs: { $elemMatch: { jobRole } } }) // find candidates with job role
//     .populate("jobs", "jobRole")
//     .then((candidates) => {
//       console.log("Candidates with job role:", candidates);
//       res.status(200).json(candidates);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     });
// }
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

export function updateCandidate (req, res) {
  const { id } = req.params;
  const { name, email, phone, address,skills,status } = req.body;

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


//post CAN with default status "applicant"
/*
  export function postCan(req, res) {
    const {
      name,
      email,
      phone,
      address,
      skills,
      department,
      postedDate,
    
    } = req.body;

    if (!name || !email || !phone || !address || !skills) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    Statuscan.findOne({ name: "applicant" })
      .then((applicantStatus) => {
        if (!applicantStatus) {
          return res.status(500).json({ error: "Could not find 'applicant' status" });
        }

        const newCan = new Candidate({
          name,
          email,
          phone,
          address,
          skills,
          department,
          postedDate,
          statuscan: {
            name: applicantStatus.name, // Set the name property to "applicant"
            _id: applicantStatus._id, // Set the _id property to the ID of the openedStatus object
          },
        });

        newCan.save()
          .then((savedCan) => {
            const responseCan = {
              ...savedCan._doc,

              statuscan: savedCan.statuscan.name, // Include the name property in the response
            };
            res.status(201).json(responseCan);
          })
          .catch((error) => {
            res.status(500).json({ error: error.message });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }*/

 /*export async function postCan(req, res) {
    try {
      const { name, email, phone, address, skills } = req.body;
  
      // Create a new applicant status object
      const applicantStatus = await Statuscan.findOne({ name: "applicant" });
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
        statuscan: [applicantStatus._id],
      });
  
      // Save the new candidate
      await newCandidate.save();
  
      // Return the new candidate object in the response
      res.status(201).json(
      
        newCandidate,
      
      );
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }*/
  //the ufnction above on the top retunr the status id not the name of the status

//the function  bellow rturn all the object of status
/*
  export async function postCan(req, res) {
    try {
      const { name, email, phone, address, skills } = req.body;
  
      // Create a new applicant status object
      const applicantStatus = await Statuscan.findOne({ name: "applicant" });
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
        statuscan: [applicantStatus._id],
      });
  
      // Save the new candidate
      await newCandidate.save();
  
      // Fetch the candidate object with the populated `statuscan` field
      const candidate = await Candidate.findById(newCandidate._id).populate("statuscan");
  
      // Return the candidate object in the response
      res.status(201).json(candidate);
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
*/
//return new name by defualt 
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


export function addCan (req, res) {
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
          skills:req.body.skills,
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
            skills:newCan.skills,
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



//send email accept-reject Candidate
/*
export function sendAcceptedEmail(req, res){
  const candidateId = req.params.id;
  Candidate.findById(candidateId)
    .then((candidate) => {
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      candidate.status = 'accepted';
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
}*/

export function sendAcceptedEmail(req, res){
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



// export function sendRejectedEmail(req, res){
//   const candidateId = req.params.id;
//   Candidate.findById(candidateId)
//   .populate(
//     {
//       path: 'jobs',
//       select: 'jobTitle status'
//     }
//   )
//     .then((candidate) => {
//       if (!candidate) {
//         return res.status(404).json({ message: 'Candidate not found' });
//       }
//       candidate.status = 'rejected';
//      // candidate.jobs[0].status= "closed"
//     /*  const jobToUpdate = candidate.jobs.find(job => job._id.toString() === jobId);
//      if (!jobToUpdate) {
//        return res.status(404).json({ message: 'Job not found' });
//      }
//      jobToUpdate.status = 'closed';
//     */
//       return candidate.save();
//     })
//     .then((savedCandidate) => {
//    //   const jobTitle = savedCandidate.jobs[0].jobTitle;

//       const mailOptions = {
//         from: '"Hr-Manager" <hrmangerp@gmail.com>', // sender address
//         to: savedCandidate.email, // candidate email address
//         subject: 'Job Application Update',
//         text: `Dear ${savedCandidate.name},\n\n
//         Thank you for taking the time to apply.  We appreciate your interest in our organization.

// After careful consideration of your application, we regret to inform you that we will not be proceeding further with your candidacy. We received a large number of applications for this position and unfortunately, we are unable to offer you the role at this time.

// We recognize that you have invested your time and effort in the interview process, and we want to express our sincere appreciation for your interest in our company. We are confident that your skills and experience will find a great match in the future.

// Please do not hesitate to apply for future openings. We will keep your resume on file for future reference.

// Thank you again for your interest in our organization, and we wish you the best of luck in your future endeavors.

// \n\nBest regards,\nHr-Manager`
//       };
//       return transporter.sendMail(mailOptions);
//     })
//     .then((info) => {
//       console.log('Email sent: ' + info.response);
//       return res.status(200).json({ message: 'Candidate rejected' });
//     })
//     .catch((err) => {
//       console.error(err.message);
//       return res.status(500).send('Server error');
//     });
// }

/*
export function addCan(req, res) {
  const { jobs, ...candidateData } = req.body;

  Candidate.create(candidateData)
  .then((candidate) => {
      if (jobs && jobs.length > 0) {
        // Add the job(s) to the candidate object's jobs array
        const jobPromises = jobs.map((jobId) => {
          return job.findById(jobId)
            .then((job) => {
              if (job) {
                candidate.jobs.push(job);
              }
            });
        });

        // Wait for all job promises to complete before saving the candidate
        Promise.all(jobPromises)
          .then(() => {
            candidate.save();
            res.status(200).json(candidate);
          })
          .catch((error) => {
            res.status(500).json({ error: error.message });
          });
      } else {
        // If there are no jobs to add, just save the candidate
        candidate.save();
        res.status(200).json(candidate);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}*/
//==================================================SEN E MAIL MEET UP=============================================
//=======================================================================================================================
//==========================================================================================================================

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
const {selectedTime}=req.body;
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
/*
//use the api of generating a link googleMeet
import { google } from 'googleapis';
import { myAuth } from '../config/auth.js';

function createEvent(candidate, date) {
  const calendar = google.calendar({ version: 'v3', auth: myAuth });
  const eventStartTime = new Date(date);
  const eventEndTime = new Date(eventStartTime.getTime() + 60 * 60 * 1000);

  const event = {
    summary: `Interview with ${candidate.name}`,
    start: { dateTime: eventStartTime.toISOString() },
    end: { dateTime: eventEndTime.toISOString() },
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(7)
      }
    }
  };

  return calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1
  })
    .then(response => {
      const meetLink = response.data.conferenceData.entryPoints[0].uri;
      return { eventId: response.data.id, meetLink };
    });
}

export function sendemailtoMeet(req, res) {
  Candidate.findById(req.params.id)
  .populate('jobs')
    .then(candidate => {
      if (!candidate) throw new Error('Candidate not found');
      const { date } = req.body; // Get the date from the request body

      const jobDomain = candidate.jobs.length > 0 ? candidate.jobs[0].jobTitle : 'a position';

      // Generate Google Meet link
      createEvent(candidate, date)
        .then(({ meetLink }) => {

          // Setup email data with unicode symbols
          const mailOptions = {
            from: '"Hr-Manager" <hrmangerp@gmail.com>', // sender address
            to: candidate.email, // candidate email address
            subject: 'Interview Invitation', // Subject line
            text: `Dear ${candidate.name},\n\nWe would like to invite you for an interview being ${candidate.status} on ${date}.\n\nPlease use the following link to join our meeting: ${meetLink}.\n\nBest regards,\nHr-Manager`,
            html: `<p>Dear ${candidate.name},</p><p>We would like to invite you for an interview being ${candidate.status} on ${date}.</p><p>Please use the following link to join our meeting: <a href="${meetLink}">${meetLink}</a>.</p><p>Best regards,<br/>Hr-Manager</p>`
          };

          // Send email and handle response with .then() and .catch()
          sendEmail(mailOptions)
            .then(info => {
              console.log('Message sent: %s', info.messageId);
              res.send('Email sent successfully');
            })
            .catch(error => {
              console.log(error);
              res.send('Error sending email');
            });
        })
        .catch(error => {
          console.log(error);
          res.send('Error generating Meet link');
        });
    })
    .catch(error => {
      console.log(error);
      res.send('Error finding candidate');
    });
}

// the route te keyfilejson failed on authjs
*/
/*

import { google } from 'googleapis';

// Your Google Cloud Platform project ID
const projectId = 'caae9cc345e14c971e64fcd533518c1b16387614	';

// The email address of the account authorized to access the Google Calendar API
const authEmail = 'hrmangerp@gmail.com';

// Your OAuth 2.0 client ID and secret
const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';

// The redirect URI for your OAuth 2.0 credentials (must be registered in the Google Cloud Console)
const redirectUri = 'https://example.com/oauth2callback';

export async function sendemailtoMeet() {
  try {
    // Create an OAuth 2.0 client object
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    // Generate the authorization URL and print it to the console
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar']
    });
    console.log(`Authorize this app by visiting this URL: ${authUrl}`);

    // Wait for the user to authorize the app via the OAuth 2.0 server
    const code = 'authorization_code'; // Replace this with the authorization code obtained from the user
    const { tokens } = await oauth2Client.getToken(code);

    // Set the credentials for the authenticated client
    oauth2Client.setCredentials(tokens);

    // Create a new Google Calendar API instance
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Define the event details
    const eventStartTime = new Date();
    const eventEndTime = new Date(eventStartTime.getTime() + (60 * 60 * 1000)); // Event duration is 1 hour
    const event = {
      summary: 'Google Meet Example',
      start: {
        dateTime: eventStartTime.toISOString(),
        timeZone: 'America/Los_Angeles'
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: 'America/Los_Angeles'
      },
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          },
          requestId: 'your_request_id'
        }
      }
    };

    // Create the new event and retrieve the Google Meet link
    const createdEvent = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    });
    const meetLink = createdEvent.data.hangoutLink;

    // Create a transporter object using nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hrmangerp@gmail.com',
        pass: 'hvoxyigokbgfeuxx'
      }
    });

    // Define the email message details
    let info = await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: 'recipient_email@example.com',
      subject: 'Google Meet Link',
      text: `Here's your Google Meet link: ${meetLink}`
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error(error);
  }
}*/
