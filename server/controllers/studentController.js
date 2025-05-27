import student from "../models/student.js";
import Test from "../models/test.js";
import Student from "../models/student.js";
import Subject from "../models/subject.js";
import Marks from "../models/marks.js";
import Attendence from "../models/attendance.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//import Fee from "../models/fee.js";
import StudentFeeDue from '../models/StudentFeeDue.js'; // NEW: Import StudentFeeDue model
import Payment from "../models/Payment.js"; // NEW: Import Payment model 


export const studentLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };
  try {
    const existingStudent = await Student.findOne({ username });
    if (!existingStudent) {
      errors.usernameError = "Student doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingStudent.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingStudent.email,
        id: existingStudent._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingStudent, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const student = await Student.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
    if (student.passwordUpdated === false) {
      student.passwordUpdated = true;
      await student.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {
      name,
      dob,
      department,
      contactNumber,
      avatar,
      email,
      batch,
      section,
      year,
      fatherName,
      motherName,
      fatherContactNumber,
    } = req.body;
    const updatedStudent = await Student.findOne({ email });
    if (name) {
      updatedStudent.name = name;
      await updatedStudent.save();
    }
    if (dob) {
      updatedStudent.dob = dob;
      await updatedStudent.save();
    }
    if (department) {
      updatedStudent.department = department;
      await updatedStudent.save();
    }
    if (contactNumber) {
      updatedStudent.contactNumber = contactNumber;
      await updatedStudent.save();
    }
    if (batch) {
      updatedStudent.batch = batch;
      await updatedStudent.save();
    }
    if (section) {
      updatedStudent.section = section;
      await updatedStudent.save();
    }
    if (year) {
      updatedStudent.year = year;
      await updatedStudent.save();
    }
    if (motherName) {
      updatedStudent.motherName = motherName;
      await updatedStudent.save();
    }
    if (fatherName) {
      updatedStudent.fatherName = fatherName;
      await updatedStudent.save();
    }
    if (fatherContactNumber) {
      updatedStudent.fatherContactNumber = fatherContactNumber;
      await updatedStudent.save();
    }
    if (avatar) {
      updatedStudent.avatar = avatar;
      await updatedStudent.save();
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const testResult = async (req, res) => {
  try {
    const { department, year, section } = req.body;
    const errors = { notestError: String };
    const student = await Student.findOne({ department, year, section });
    const test = await Test.find({ department, year, section });
    if (test.length === 0) {
      errors.notestError = "No Test Found";
      return res.status(404).json(errors);
    }
    var result = [];
    for (var i = 0; i < test.length; i++) {
      var subjectCode = test[i].subjectCode;
      var subject = await Subject.findOne({ subjectCode });
      var marks = await Marks.findOne({
        student: student._id,
        exam: test[i]._id,
      });
      if (marks) {
        var temp = {
          marks: marks.marks,
          totalMarks: test[i].totalMarks,
          subjectName: subject.subjectName,
          subjectCode,
          test: test[i].test,
        };

        result.push(temp);
      }
    }

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
};
// Register new student
export const registerStudent = async (req, res) => {
  try {
    const existing = await Student.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ error: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newStudent = new Student({ ...req.body, password: hashedPassword });
    await newStudent.save();

    res.status(201).json({ message: "Registration successful", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const recordManualFeePayment = async (req, res) => {
  try {
    const { amount, paymentMethod = "Cash", studentFeeDueId } = req.body;
    const studentId = req.params.id; // Student ID from URL parameter

    // --- Input Validation ---
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number." });
    }
    if (!studentFeeDueId) {
        return res.status(400).json({ error: "A specific outstanding fee (studentFeeDueId) must be provided." });
    }

    // --- Fetch and Validate Related Documents ---
    const student = await Student.findById(studentId);
    // Populate feeStructure to get its name for context/validation messages
    const studentFeeDue = await StudentFeeDue.findById(studentFeeDueId).populate('feeStructure');

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }
    // Check if the fee due record exists AND belongs to the specified student
    if (!studentFeeDue || studentFeeDue.student.toString() !== studentId) {
        return res.status(404).json({ error: "Outstanding fee record not found for this student or does not belong to them." });
    }
    // Validate that the amount being paid does not exceed the outstanding balance
    if (parseFloat(amount) > studentFeeDue.balance) {
        return res.status(400).json({ error: `Amount exceeds outstanding balance of ₹${studentFeeDue.balance.toFixed(2)} for ${studentFeeDue.feeStructure?.name || 'selected fee'}.` });
    }

    // --- Create the Payment record for manual submission ---
    // For manual payments, status is immediately 'Success'
    const payment = new Payment({
      student: studentId,
      studentFeeDue: studentFeeDueId,
      amount: parseFloat(amount),
      paymentDate: new Date(), // The date this payment was recorded
      paymentMethod: paymentMethod,
      status: "Success",
      // recordedBy: req.user.id, // Uncomment this line if you track which admin/user recorded it
    });
    await payment.save();

    // --- Update the StudentFeeDue record ---
    studentFeeDue.amountPaid += payment.amount;
    // Push the payment ID to the payments array of the StudentFeeDue.
    // Ensure no duplicates if this function was called multiple times for the same payment.
    if (!studentFeeDue.payments.includes(payment._id)) {
        studentFeeDue.payments.push(payment._id);
    }
    await studentFeeDue.save(); // This will automatically trigger the pre-save hook to update status and balance

    // --- Update the Student's overall payment history ---
    // Push the payment ID to the student's general paymentHistory array.
    if (!student.paymentHistory.includes(payment._id)) {
        student.paymentHistory.push(payment._id);
        await student.save();
    }

    // --- Prepare Response ---
    // Re-fetch the student and fee dues with populated data for the response
    const updatedStudent = await Student.findById(studentId)
        .populate({
            path: 'feeDues', // Populate the feeDues array
            populate: { path: 'feeStructure' } // And populate the feeStructure within each feeDue
        })
        .populate({
            path: 'paymentHistory', // Populate the paymentHistory array
            populate: { path: 'studentFeeDue' } // And populate the studentFeeDue within each payment
        });

    res.status(201).json({
      message: "Manual fee payment recorded and student data updated successfully.",
      payment: payment, // The newly created payment record
      student: updatedStudent, // The updated student document with populated data
      updatedFeeDue: studentFeeDue, // The updated outstanding fee due record
    });
  } catch (error) {
    console.error("Error recording manual fee payment:", error); // Log the actual error for debugging
    res.status(500).json({ error: error.message || "Internal server error." });
  }
};

/**
 * @desc Get all outstanding/partially paid fees for a specific student
 * @route GET /api/students/:id/fees/outstanding
 * @access Private (Student or Admin/Staff)
 */
export const getStudentOutstandingFees = async (req, res) => {
    try {
        // studentId can come from URL params (for admin lookup) or req.user.id (for student's own view)
        const studentId = req.params.id; // Assuming the ID is in the URL parameter

        const outstandingFees = await StudentFeeDue.find({
            student: studentId,
            status: { $in: ['Outstanding', 'Partially Paid'] } // Find fees that are not fully paid
        }).populate('feeStructure'); // Populate the fee structure details (like name)

        res.status(200).json({ outstandingFees });
    } catch (error) {
        console.error("Error fetching student outstanding fees:", error);
        res.status(500).json({ error: error.message || "Internal server error." });
    }
};

/**
 * @desc Get all payment history for a specific student
 * @route GET /api/students/:id/payments/history
 * @access Private (Student or Admin/Staff)
 */
export const getStudentPaymentHistory = async (req, res) => {
    try {
        // studentId can come from URL params or req.user.id
        const studentId = req.params.id;

        const paymentHistory = await Payment.find({ student: studentId })
            .populate('studentFeeDue') // Populate the linked outstanding fee item
            .sort({ paymentDate: -1 }); // Sort by latest payments first

        res.status(200).json({ paymentHistory });
    } catch (error) {
        console.error("Error fetching student payment history:", error);
        res.status(500).json({ error: error.message || "Internal server error." });
    }
};


export const attendance = async (req, res) => {
  try {
    const { department, year, section } = req.body;
    const errors = { notestError: String };
    const student = await Student.findOne({ department, year, section });

    const attendence = await Attendence.find({
      student: student._id,
    }).populate("subject");
    if (!attendence) {
      res.status(400).json({ message: "Attendence not found" });
    }

    res.status(200).json({
      result: attendence.map((att) => {
        let res = {};
        res.percentage = (
          (att.lectureAttended / att.totalLecturesByFaculty) *
          100
        ).toFixed(2);
        res.subjectCode = att.subject.subjectCode;
        res.subjectName = att.subject.subjectName;
        res.attended = att.lectureAttended;
        res.total = att.totalLecturesByFaculty;
        return res;
      }),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
