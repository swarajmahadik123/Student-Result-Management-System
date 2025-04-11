// models/StudentResult.js
import mongoose from "mongoose";

const studentResultSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherName: { type: String, required: true },
    gender: { type: String, required: true, enum: ["मुलगा", "मुलगी"] },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    phoneNo: { type: String, required: true },
    rollNumber: { type: String, required: true },
    admissionNumber: { type: String, required: true, unique: true },
    standard: { type: String, required: true },
    academicYear: { type: String, required: true },
    resultFormatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResultFormat",
      required: true,
    },
    result: {
      annamayaKosha: {
        physicalMeasurements: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            session1: { type: String },
            session2: { type: String },
          },
        ],
        dailyObservations: [
          {
            id: { type: String, required: true },
            category: { type: String, required: true },
            selectedOption: { type: String },
          },
        ],
        annualActivities: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            value: { type: String },
          },
        ],
        prakruti: { type: String },
      },
      pranamayaKosha: {
        chhandavarga: {
          music: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          computer: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          art: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
        },
        yogabhyas: {
          asanas: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          pranayam: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
        },
        pathantar: {
          sanskrit: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          marathi: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
        },
        dailyObservations: [
          {
            id: { type: String, required: true },
            category: { type: String, required: true },
            selectedOption: { type: String },
          },
        ],
        annualActivities: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            value: { type: String },
          },
        ],
      },
      manomayaKosha: {
        dailyObservations: [
          {
            id: { type: String, required: true },
            category: { type: String, required: true },
            selectedOption: { type: String },
          },
        ],
        annualActivities: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            value: { type: String },
          },
        ],
      },
      vidnyanmayaKosha: {
        subjects: [
          {
            id: { type: String, required: true },
            label: { type: String, required: true }, // Subject name
            grade: { type: String }, // Grade for the subject
          },
        ],

        maunAbhyasActivities: {
          mukhyaVishay: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          anubhavLekhan: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          charitryaAbhyas: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          prakatVachan: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
          rasGrahan: [
            {
              id: { type: String, required: true },
              name: { type: String, required: true },
              isPresent: { type: Boolean, default: false },
            },
          ],
        },
        dailyObservations: [
          {
            id: { type: String, required: true },
            category: { type: String, required: true },
            selectedOption: { type: String },
          },
        ],
        annualActivities: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            value: { type: String },
          },
        ],
      },
      anandmayaKosha: {
        dailyObservations: [
          {
            id: { type: String, required: true },
            category: { type: String, required: true },
            selectedOption: { type: String },
          },
        ],
        annualActivities: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            value: { type: String },
          },
        ],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
studentResultSchema.index({ standard: 1 });
studentResultSchema.index({ rollNumber: 1 });
studentResultSchema.index({ name: 1 });
studentResultSchema.index({ admissionNumber: 1 }, { unique: true });
studentResultSchema.index({ resultFormatId: 1 });

const StudentResult = mongoose.model("StudentResult", studentResultSchema);

export default StudentResult;
