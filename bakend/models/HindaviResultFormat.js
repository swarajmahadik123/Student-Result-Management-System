import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
});

const gradeSchema = new mongoose.Schema({
  grade: String,
  options: [{ type: String }],
});

const healthSummaryFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Height", "Oral", "Nose", "Nails", "Weight", "Ears", "Eyes", "Skin"],
  },
  type: {
    type: String,
    enum: ["text", "select"],
  },
  value: String,
  options: [{ type: String }],
});

const systemicExaminationFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["RS", "Vital Signs", "CVS", "Advise", "CNS", "Remark"],
  },
  value: String,
  options: [{ type: String }],
});

const hindaviResultFormatSchema = new mongoose.Schema({
  standard: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  subjects: [subjectSchema],
  grades: [gradeSchema],
  healthSummary: [
    {
      name: String,
      type: String,
      value: String,
      options: [{ type: String }],
    },
  ],
  systemicExamination: [
    {
      name: String,
      value: String,
      options: [{ type: String }],
    },
  ],
});

const HindaviResultFormat = mongoose.model(
  "HindaviResultFormat",
  hindaviResultFormatSchema
);
export default HindaviResultFormat;
