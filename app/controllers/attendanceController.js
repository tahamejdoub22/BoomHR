import Attendance from "../models/attendance.js";
import Benefit from "../models/benefit.js";
import Employee from "../models/Employee.js";
import GrossSalary from "../models/GrossSalary.js";
import IncomeTax from "../models/IncomeTax.js";
import NetSalary from "../models/netsalary.js";
import WebSocket from "ws";
import admin from "firebase-admin";
import mailgun from "mailgun-js";
import moment from "moment";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { WebSocketServer } from "ws";
import { serviceAccount } from "../config/serviceAccountKey.js";
import { calculateBenefitAmount } from "../controllers/benefitcontroller.js";
import { Deduction } from "../models/deduction.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



// Check-in function
// Check-in function

// Create a new WebSocket server instance
const clients = [];

const wsServer = new WebSocketServer({ port:8000 });
wsServer.on("connection", ws => {
  console.log("WebSocket client connected");
  
  // handle WebSocket message
  clients.push(ws);


  // handle WebSocket disconnection
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});


export const checkIn = async (req, res) => {
  try {
    const { employee_id, location } = req.body;

    // Create a new attendance record
    const attendance = new Attendance({
      employee_id,
      checkInTime: Date.now(),
      location,
    });

    // Save the attendance record to the database
    const newAttendance = await attendance.save();

    // Retrieve the employee model for the response
    const employee = await Employee.findById(employee_id);

    // Create a notification message to send via WebSockets
    const notification = {
      title: "Employee Checked In",
      body: `${employee.first_name} checked in at ${new Date().toLocaleTimeString()}`,
    };

    // Send the notification message to all connected WebSocket clients
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(notification));
      }
    });

    // Return the response with the employee and updated attendance record
    res.status(200).json({
      message: "Employee checked in",
      attendance: newAttendance,
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error checking in employee",
      error,
    });
  }
};



export const checkOut = async (req, res) => {
  try {
    // Find the attendance instance by its ID
    const attendance = await Attendance.findById(req.params.id.trim());

    // If the attendance instance doesn't exist or already has a checkOutTime, return an error
    if (!attendance || attendance.checkOutTime) {
      return res.status(400).json({ message: 'Invalid attendance record' });
    }

    // Calculate the total work time for the attendance record in minutes
    const checkInTime = moment(attendance.checkInTime);
    const checkOutTime = moment();
    const totalWorkTimeMinutes = checkOutTime.diff(checkInTime, 'minutes');

    // Convert total work time to hours
    const totalWorkTimeHours = (totalWorkTimeMinutes / 60).toFixed(2);

    // Update the attendance record with the checkOutTime and totalWorkTime
    attendance.checkOutTime = new Date();
    attendance.totalWorkTime = totalWorkTimeHours;

    await attendance.save();

    // Return the response with the updated attendance record and total work time in hours
    res.status(200).json({
      message: 'Employee checked out',
      attendance,
      totalWorkTime: totalWorkTimeHours,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error checking out employee',
      error,
    });
  }
};


// Get attendance history for an employee
export const getAttendanceHistory = async (req, res) => {
  try {
    const { employee_id } = req.params;

    // Find all attendance records for the employee
    const attendanceRecords = await Attendance.aggregate([
      {
        $match: { employee_id: mongoose.Types.ObjectId(employee_id) },
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'employee_id',
          foreignField: '_id',
          as: 'employee',
        },
      },
      {
        $unwind: '$employee',
      },
      {
        $project: {
          _id: 1,
          employee: {
            $concat: ['$employee.first_name', ' ', '$employee.last_name'],
          },
          checkInTime: 1,
          checkOutTime: 1,
          totalWorkTime: 1,
        },
      },
    ]);

    res.status(200).json({
      message: 'Attendance history retrieved successfully',
      attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving attendance history',
      error,
    });
  }
};



export async function getAttendance(req, res) {
  try {
    const attendance = await Attendance.find({})
      .populate({ path: 'employee', select: ['first_name', 'last_name'], model: Employee })
      .exec();
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}


async function getTotalWorkTimeForMonthByEmployee(employeeId, year, month, hourlyRate) {
  const attendanceList = await Attendance.find({
    employee_id: employeeId,
    checkInTime: {
      $gte: new Date(year, month - 1, 1), // Starting from the 1st day of the month
      $lte: new Date(year, month, 0, 23, 59, 59) // Ending at the last day of the month at 11:59:59 PM
    }
  });

  let totalWorkTime = 0;

  attendanceList.forEach((attendance) => {
    const checkInTime = attendance.checkInTime.getTime();
    const checkOutTime = attendance.checkOutTime.getTime();

    const workTimeInMs = checkOutTime - checkInTime;
    totalWorkTime += workTimeInMs;
  });

  const totalWorkTimeInHours = totalWorkTime / (1000 * 60 * 60); // Convert milliseconds to hours




  return totalWorkTimeInHours;
}

export async function calculateGrossSalary(employeeId, year, month, hourlyRate) {
  try {
    const totalWorkTimeInHours = await getTotalWorkTimeForMonthByEmployee(employeeId, year, month);
    const grossSalary = hourlyRate * totalWorkTimeInHours;

    if (isNaN(grossSalary)) {
      throw new Error(`GrossSalary is not a number: ${grossSalary}`);
    }

    return {
      employee_id: employeeId,
      year: year,
      month: month,
      hourlyRate: hourlyRate,
      totalWorkTime: totalWorkTimeInHours,
      grossSalary: grossSalary.toFixed(2),
    };
  } catch (error) {
    console.error(`Error calculating gross salary for employee ${employee_id} in ${year}-${month}: ${error}`);
    return null;
  }
}

export async function saveGrossSalary(grossSalary) {
  try {
    if (isNaN(grossSalary.grossSalary)) {
      throw new Error(`GrossSalary is not a number: ${grossSalary.grossSalary}`);
    }
    
    const newGrossSalary = new GrossSalary(grossSalary);
    const savedGrossSalary = await newGrossSalary.save();
    console.log(`Saved gross salary for employee ${savedGrossSalary.employee_id} in ${savedGrossSalary.year}-${savedGrossSalary.month}.`);
    return savedGrossSalary;
  } catch (error) {
    console.error(`Error saving gross salary: ${error}`);
    return null;
  }
}


    export async function calculateAndSaveGrossSalary(req, res) {
      try {
        const { id: employee_id, year, month } = req.params;
        const { hourlyRate } = req.body;
    
        // Check if gross salary already exists for the given employee, year, and month
        const existingGrossSalary = await GrossSalary.findOne({ employee_id: employee_id, year: year, month: month });
        if (existingGrossSalary) {
          return res.status(400).json({ message: 'Gross salary already calculated and saved for this period' });
        }
    
        const grossSalary = await calculateGrossSalary(employee_id, year, month, hourlyRate);
    
        if (grossSalary) {
          const savedGrossSalary = await saveGrossSalary(grossSalary);
          res.status(200).json(savedGrossSalary);
        } else {
          res.status(500).json({ message: 'Error calculating gross salary' });
        }
      } catch (error) {
        console.error(`Error calculating and saving gross salary: ${error}`);
        res.status(500).json({ message: 'Error calculating and saving gross salary' });
      }
    }
    

export async function getAllGrossSalaries(req, res) {
  try {
    const grossSalaries = await GrossSalary.find({}).populate('employee_id', 'first_name last_name avatar')

    .exec();;
    res.status(200).json(grossSalaries);
  } catch (error) {
    console.error(`Error retrieving gross salaries: ${error}`);
    res.status(500).json({ message: 'Error retrieving gross salaries' });
  }
}
// DELETE /api/grosssalaries/:id




export const deleteGrossSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const grossSalary = await GrossSalary.findById(id);
    if (!grossSalary) {
      return res.status(404).json({ message: "Gross Salary Not Found" });
    }
    await grossSalary.remove();
    res.json({ message: "Gross Salary Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};




// PUT /api/grosssalaries/:id/hourly-rate

export const updateGrossSalaryHourlyRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { hourlyRate } = req.body;

    // Find the gross salary record
    const grossSalary = await GrossSalary.findById(id);

    // Update the hourly rate for the employee
    const employee = await Employee.findById(grossSalary.employee_id);
    employee.hourlyRate = hourlyRate;
    await employee.save();

    // Calculate the new gross salary
    const totalWorkTimeInHours = grossSalary.totalWorkTime;
    const grossSalaryValue = hourlyRate * totalWorkTimeInHours;

    // Find all deductions associated with this gross salary record
    const deductions = await Deduction.find({ grossSalary_id: grossSalary._id });
    const incomeTaxs = await IncomeTax.find({ grossSalary_id: grossSalary._id });
    const netsalarys= await NetSalary.find({ grossSalary_id: grossSalary._id });

    // Update the gross salary record
    grossSalary.hourlyRate = hourlyRate;
    grossSalary.grossSalary = grossSalaryValue.toFixed(2);
    await grossSalary.save();

    // Update the deduction amounts based on the new gross salary value
   
  // Update the incomtax amounts based on the new gross salary value
  for (const incomeTax of incomeTaxs) {
    await incomeTax.save();
  }
  for (const deduction of deductions) {
    await deduction.save();
  }
 
    // Find all benefits associated with this gross salary record
    const benefits = await Benefit.find({ grossSalaryId: grossSalary._id });

    // Update the benefit amounts based on the new gross salary value
    for (const benefit of benefits) {
      const newAmount = calculateBenefitAmount(benefit.coverage, grossSalaryValue);
      benefit.amount = newAmount;
      await benefit.save();
    }
    for (const netsalary of netsalarys) {
      await netsalary.save();
    }
    // Send an email to the employee
    const mg = mailgun({
      apiKey: '3771a9f0c972507421004497a9a0d5f5-81bd92f8-7b442285',
      domain: 'sandbox18d6f0d88e6d4df38f05bf89e15a1677.mailgun.org'
    });
    const data = {
      from: "support@BoomHR.tn",
      to: employee.email,
      subject: "Your gross salary has been updated",
      text: `Dear ${employee.name},\n\nYour gross salary has been updated to ${grossSalaryValue.toFixed(2)}.\n\nBest regards,\nThe HR Team`,
    };

    mg.messages().send(data, function (error, body) {
      console.log(body);
    });

    res.json(grossSalary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


