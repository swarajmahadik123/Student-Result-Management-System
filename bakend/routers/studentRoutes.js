// routes/studentRoutes.js
import express from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  updateStudentResult,
  deleteStudent,
  getStudentsByStandard,
  getStudentByAdmissionNumber,
  downloadStudentResult,
} from "../controllers/studentController.js";

const router = express.Router();

// Get all students with optional filtering
router.route("/").get(getStudents).post(createStudent);

// Routes for specific student by ID
router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

// Update only the result part of a student 
router.route("/:id/result").put(updateStudentResult);
router.get("/:id/result/download", downloadStudentResult);

// Get students by standard
router.route("/standard/:standard").get(getStudentsByStandard);

// Get student by admission number
router.route("/admission/:admissionNumber").get(getStudentByAdmissionNumber);

export default router;
