import mongoose from "mongoose";

const resultFormatSchema = new mongoose.Schema(
  {
    // AnnamayaKosha (Physical measurements and observations)
    annamayaKosha: {
      physicalMeasurements: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
        },
      ],
      dailyObservations: [
        {
          id: { type: String, required: true },
          category: { type: String, required: true },
          options: [String],
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

    // PranamayaKosha (Skills and activities)
    pranamayaKosha: {
      chhandavarga: {
        music: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        computer: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        art: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
      },
      yogabhyas: {
        asanas: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        pranayam: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
      },
      pathantar: {
        sanskrit: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        marathi: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
      },
      dailyObservations: [
        {
          id: { type: String, required: true },
          category: { type: String, required: true },
          options: [String],
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

    // ManomayaKosha (Mental and emotional development)
    manomayaKosha: {
      dailyObservations: [
        {
          id: { type: String, required: true },
          category: { type: String, required: true },
          options: [String],
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

    // VidnyanmayaKosha (Academic results and study)
    vidnyanmayaKosha: {
      subjects: [
        {
          id: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      maunAbhyasActivities: {
        mukhyaVishay: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        anubhavLekhan: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        charitryaAbhyas: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        prakatVachan: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
        rasGrahan: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
          },
        ],
      },

      dailyObservations: [
        {
          id: { type: String, required: true },
          category: { type: String, required: true },
          options: [String],
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

    // AnandmayaKosha (Joy and satisfaction)
    anandmayaKosha: {
      dailyObservations: [
        {
          id: { type: String, required: true },
          category: { type: String, required: true },
          options: [String],
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

    // General information
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
  },
  {
    timestamps: true,
  }
);

const ResultFormat = mongoose.model("ResultFormat", resultFormatSchema);

export default ResultFormat;
