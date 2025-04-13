// controllers/studentController.js
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import asyncHandler from "express-async-handler";
import StudentResult from "../models/StudentResult.js";
import ResultFormat from "../models/ResultFormat.js";
import  {generateStudentResultPDF}  from "../utils/pdfGenerator.js";
import { fileURLToPath } from "url";
// @desc    Get all students
// @route   GET /api/students
// @access  Private
const getStudents = asyncHandler(async (req, res) => {
  const { standard, search } = req.query;

  let query = {};

  if (standard) {
    query.standard = standard;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { rollNumber: { $regex: search, $options: "i" } },
      { admissionNumber: { $regex: search, $options: "i" } },
    ];
  }

  const students = await StudentResult.find(query).select("-result");
  res.json(students);
});

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = asyncHandler(async (req, res) => {
  const student = await StudentResult.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc    Create a new student
// @route   POST /api/students
// @access  Private
const createStudent = asyncHandler(async (req, res) => {
  const {
    name,
    motherName,
    fatherName,
    gender,
    dob,
    address,
    phoneNo,
    rollNumber,
    admissionNumber,
    standard,
    division,
    academicYear,
  } = req.body;

  // Check if student with same admission number already exists
  const studentExists = await StudentResult.findOne({ admissionNumber });

  if (studentExists) {
    res.status(400);
    throw new Error("Student with this admission number already exists");
  }

  // Find the result format for this standard and academic year
  const resultFormat = await ResultFormat.findOne({
    standard,
    academicYear,
  });

  if (!resultFormat) {
    res.status(404);
    throw new Error(
      `Result format not found for standard ${standard} and academic year ${academicYear}`
    );
  }

  // Initialize result structure based on the format
  const result = {
    annamayaKosha: {
      physicalMeasurements: resultFormat.annamayaKosha.physicalMeasurements.map(
        (item) => ({
          id: item.id,
          name: item.name,
          session1: "",
          session2: "",
        })
      ),
      dailyObservations: resultFormat.annamayaKosha.dailyObservations.map(
        (item) => ({
          id: item.id,
          category: item.category,
          selectedOption: "",
        })
      ),
      annualActivities: resultFormat.annamayaKosha.annualActivities.map(
        (item) => ({
          id: item.id,
          name: item.name,
          value: "",
        })
      ),
    },
    pranamayaKosha: {
      chhandavarga: {
        music: resultFormat.pranamayaKosha.chhandavarga.music.map((item) => ({
          id: item.id,
          name: item.name,
          isPresent: false,
        })),
        computer: resultFormat.pranamayaKosha.chhandavarga.computer.map(
          (item) => ({
            id: item.id,
            name: item.name,
            isPresent: false,
          })
        ),
        art: resultFormat.pranamayaKosha.chhandavarga.art.map((item) => ({
          id: item.id,
          name: item.name,
          isPresent: false,
        })),
      },
      yogabhyas: {
        asanas: resultFormat.pranamayaKosha.yogabhyas.asanas.map((item) => ({
          id: item.id,
          name: item.name,
          isPresent: false,
        })),
        pranayam: resultFormat.pranamayaKosha.yogabhyas.pranayam.map(
          (item) => ({
            id: item.id,
            name: item.name,
            isPresent: false,
          })
        ),
      },
      pathantar: {
        sanskrit: resultFormat.pranamayaKosha.pathantar.sanskrit.map(
          (item) => ({
            id: item.id,
            name: item.name,
            isPresent: false,
          })
        ),
        marathi: resultFormat.pranamayaKosha.pathantar.marathi.map((item) => ({
          id: item.id,
          name: item.name,
          isPresent: false,
        })),
      },
      dailyObservations: resultFormat.pranamayaKosha.dailyObservations.map(
        (item) => ({
          id: item.id,
          category: item.category,
          selectedOption: "",
        })
      ),
      annualActivities: resultFormat.pranamayaKosha.annualActivities.map(
        (item) => ({
          id: item.id,
          name: item.name,
          value: "",
        })
      ),
    },
    manomayaKosha: {
      dailyObservations: resultFormat.manomayaKosha.dailyObservations.map(
        (item) => ({
          id: item.id,
          category: item.category,
          selectedOption: "",
        })
      ),
      annualActivities: resultFormat.manomayaKosha.annualActivities.map(
        (item) => ({
          id: item.id,
          name: item.name,
          value: "",
        })
      ),
    },
    vidnyanmayaKosha: {
      subjects: resultFormat.vidnyanmayaKosha.subjects.map((item) => ({
        id: item.id,
        label: item.label,
        unit1: { total: "25", obtained: "0" },
        semester1: { total: "50", obtained: "0" },
        unit2: { total: "25", obtained: "0" },
        terminal: { total: "100", obtained: "0" },
        grade: "",
      })),
      maunAbhyasActivities: {
        mukhyaVishay:
          resultFormat.vidnyanmayaKosha.maunAbhyasActivities.mukhyaVishay.map(
            (item) => ({
              id: item.id,
              name: item.name,
              isPresent: false,
            })
          ),
        anubhavLekhan:
          resultFormat.vidnyanmayaKosha.maunAbhyasActivities.anubhavLekhan.map(
            (item) => ({
              id: item.id,
              name: item.name,
              isPresent: false,
            })
          ),
        charitryaAbhyas:
          resultFormat.vidnyanmayaKosha.maunAbhyasActivities.charitryaAbhyas.map(
            (item) => ({
              id: item.id,
              name: item.name,
              isPresent: false,
            })
          ),
        prakatVachan:
          resultFormat.vidnyanmayaKosha.maunAbhyasActivities.prakatVachan.map(
            (item) => ({
              id: item.id,
              name: item.name,
              isPresent: false,
            })
          ),
        rasGrahan:
          resultFormat.vidnyanmayaKosha.maunAbhyasActivities.rasGrahan.map(
            (item) => ({
              id: item.id,
              name: item.name,
              isPresent: false,
            })
          ),
      },
      dailyObservations: resultFormat.vidnyanmayaKosha.dailyObservations.map(
        (item) => ({
          id: item.id,
          category: item.category,
          selectedOption: "",
        })
      ),
      annualActivities: resultFormat.vidnyanmayaKosha.annualActivities.map(
        (item) => ({
          id: item.id,
          name: item.name,
          value: "",
        })
      ),
    },
    anandmayaKosha: {
      dailyObservations: resultFormat.anandmayaKosha.dailyObservations.map(
        (item) => ({
          id: item.id,
          category: item.category,
          selectedOption: "",
        })
      ),
      annualActivities: resultFormat.anandmayaKosha.annualActivities.map(
        (item) => ({
          id: item.id,
          name: item.name,
          value: "",
        })
      ),
    },
  };

  const student = await StudentResult.create({
    name,
    motherName,
    fatherName,
    gender,
    dob,
    address,
    phoneNo,
    rollNumber,
    admissionNumber,
    standard,
    division, 
    academicYear,
    resultFormatId: resultFormat._id, // Store the format ID for reference
    result,
  });

  res.status(201).json(student);
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
  const student = await StudentResult.findById(req.params.id);

  if (student) {
    // Update basic info
    student.name = req.body.name || student.name;
    student.motherName = req.body.motherName || student.motherName;
    student.fatherName = req.body.fatherName || student.fatherName;
    student.gender = req.body.gender || student.gender;
    student.dob = req.body.dob || student.dob;
    student.address = req.body.address || student.address;
    student.phoneNo = req.body.phoneNo || student.phoneNo;
    student.rollNumber = req.body.rollNumber || student.rollNumber;
    student.standard = req.body.standard || student.standard;
    student.academicYear = req.body.academicYear || student.academicYear;

    // If admission number is being changed, check for uniqueness
    if (
      req.body.admissionNumber &&
      req.body.admissionNumber !== student.admissionNumber
    ) {
      const studentExists = await StudentResult.findOne({
        admissionNumber: req.body.admissionNumber,
      });

      if (studentExists) {
        res.status(400);
        throw new Error("Student with this admission number already exists");
      }

      student.admissionNumber = req.body.admissionNumber;
    }

    // Update result if provided
    if (req.body.result) {
      student.result = req.body.result;
    }

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc    Update student result
// @route   PUT /api/students/:id/result
// @access  Private
const updateStudentResult = asyncHandler(async (req, res) => {
  const student = await StudentResult.findById(req.params.id);

  if (student) {
    // Update only the result part
    student.result = req.body.result || student.result;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await StudentResult.findById(req.params.id);

  if (student) {
    await student.deleteOne();
    res.json({ message: "Student removed" });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc    Get students by standard
// @route   GET /api/students/standard/:standard
// @access  Private
const getStudentsByStandard = asyncHandler(async (req, res) => {
  const students = await StudentResult.find({
    standard: req.params.standard,
  }).select("-result");

  res.json(students);
});

// @desc    Get student by admission number
// @route   GET /api/students/admission/:admissionNumber
// @access  Private
const getStudentByAdmissionNumber = asyncHandler(async (req, res) => {
  const student = await StudentResult.findOne({
    admissionNumber: req.params.admissionNumber,
  });

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});



export const downloadStudentResult = asyncHandler(async (req, res) => {
  try {
    const studentId = req.params.id;

    // Fetch student data from the database
    const student = await StudentResult.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Generate PDF using Puppeteer
    const pdfBuffer = await generateStudentResultPDF(student);

    // Validate buffer size
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error("Failed to generate PDF");
    }

    // Set response headers for PDF download
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
      "Content-Disposition": `attachment; filename="student_result_${studentId}.pdf"`,
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
    });

    // Send the PDF buffer directly
    res.end(pdfBuffer); // Use res.end() for binary data
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
});


export {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  updateStudentResult,
  deleteStudent,
  getStudentsByStandard,
  getStudentByAdmissionNumber,
};
