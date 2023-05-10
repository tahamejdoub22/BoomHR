import Attendance from "../models/attendance.js";
import Employee from "../models/Employee.js";
import Salaire from "../models/salary.js";
import moment from "moment";

async function calculateSalary(employeeId, month) {
  try {
    // Getting the employee_id from the request parameters
    const { employee_id } = req.params;

    // Finding all attendance records of the employee
    const attendanceRecords = await Attendance.find({ employee_id });

    // Calculating the total work time of the employee
    let totalWorkTime = 0;
    attendanceRecords.forEach((attendance) => {
      const { checkInTime, checkOutTime } = attendance;
      const duration = moment.duration(moment(checkOutTime).diff(moment(checkInTime)));
      totalWorkTime += duration.asHours();
    });

    // Calculating the salary of the employee
    const hourlyRate = 10; // Assuming the hourly rate is $10
    const salary = totalWorkTime * hourlyRate;

    // Updating the totalWorkTime and updatedAt fields in the latest attendance record
    const latestAttendanceRecord = attendanceRecords[attendanceRecords.length - 1];
    latestAttendanceRecord.totalWorkTime = totalWorkTime;
    latestAttendanceRecord.updatedAt = new Date();
    await latestAttendanceRecord.save();

    // Sending the salary as response
    res.send({ salary });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}



  
  

const addHourlyRate = async (req, res) => {
    const { employeeId, hourlyRate } = req.body;
  
    try {
      // Find the employee with the given ID
      const employee = await Employee.findById(employeeId);
  
      if (!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      // Create a new hourly rate document
      const hourlyRateDoc = new Salaire({
        employee_id: employeeId,
        hourlyRate: hourlyRate,
      });
  
      // Save the hourly rate document
      await hourlyRateDoc.save();
  
      res.json({ success: true, message: "Hourly rate added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
export { calculateSalary ,addHourlyRate };
