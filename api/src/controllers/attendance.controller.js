import { attendanceModel } from "../models/attendance.model.js";
import { studentModel } from "../models/student.model.js";
import { teacherModel } from "../models/teacher.model.js";

export const markAttendance = async (req, res, next) => {
  try {
    // getting the student id
    const studentId = req.userId;
    if (!studentId) {
      const err = new Error(`Authentication failed`);
      throw err;
    }

    // finding the student in database
    const student = await studentModel.findOne({ _id: studentId });
    if (!student) {
      const err = new Error(`Not Registered`);
      throw err;
    }

    // getting the teacher's details
    const { teacherUniqueId } = req.body;
    if (!teacherUniqueId) {
      const err = new Error(`Teacher Id is required`);
    }

    // finding the teacher in database
    const teacher = await teacherModel.findOne({ uniqueId: teacherUniqueId });
    if (!teacher) {
      const err = new Error(`Teacher not found`);
      throw err;
    }

    // marking the attendance
    const newAttendance = new attendanceModel({
      teacherId: teacher._id,
      studentId,
    });
    await newAttendance.save();

    res.json({ success: true, message: "Attendance marked." });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};
