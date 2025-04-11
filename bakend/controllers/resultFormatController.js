  import asyncHandler from "express-async-handler";
  import ResultFormat from "../models/ResultFormat.js";

  // @desc    Get all result formats
  // @route   GET /api/result-formats
  // @access  Private
  const getResultFormats = asyncHandler(async (req, res) => {
    const resultFormats = await ResultFormat.find({});
    res.json(resultFormats);
  });

  // @desc    Get result format by ID
  // @route   GET /api/result-formats/:id
  // @access  Private
  const getResultFormatById = asyncHandler(async (req, res) => {
    const resultFormat = await ResultFormat.findById(req.params.id);
    if (resultFormat) {
      res.json(resultFormat);
    } else {
      res.status(404);
      throw new Error("Result format not found");
    }
  });


 

  // @desc    Update a result format
  // @route   PUT /api/result-formats/:id
  // @access  Private
  const updateResultFormat = asyncHandler(async (req, res) => {
    const resultFormat = await ResultFormat.findById(req.params.id);
    
    if (resultFormat) {
      Object.assign(resultFormat, req.body);
      const updatedResultFormat = await resultFormat.save();
      res.json(updatedResultFormat);
    } else {
      res.status(404);
      throw new Error("Result format not found");
    }
  });

  // @desc    Delete a result format
  // @route   DELETE /api/result-formats/:id
  // @access  Private
const deleteResultFormat = asyncHandler(async (req, res) => {
  const resultFormat = await ResultFormat.findById(req.params.id);

  if (resultFormat) {
    await resultFormat.deleteOne();
    res.json({ message: "Result format removed" });
  } else {
    res.status(404);
    throw new Error("Result format not found");
  }
});
  const createResultFormat = asyncHandler(async (req, res) => {
    const {
      standard,
      academicYear,
      createdBy,
      annamayaKosha,
      pranamayaKosha,
      manomayaKosha,
      vidnyanmayaKosha,
      anandmayaKosha,
    } = req.body;

    // Check if a format already exists for this standard and academic year
    const existingFormat = await ResultFormat.findOne({
      standard,
      academicYear,
    });
    

    if (existingFormat) {
      res.status(400);
      throw new Error(
        "A result format for this standard and academic year already exists"
      );
    }

    const resultFormat = new ResultFormat({
      standard,
      academicYear,
      createdBy,
      annamayaKosha: annamayaKosha || {
        physicalMeasurements: [],
        dailyObservations: [],
        annualActivities: [],
      },
      pranamayaKosha: pranamayaKosha || {
        chhandavarga: {
          music: [],
          computer: [],
          art: [],
        },
        yogabhyas: {
          asanas: [],
          pranayam: [],
        },
        pathantar: {
          sanskrit: [],
          marathi: [],
        },
        dailyObservations: [],
        annualActivities: [],
      },
      manomayaKosha: manomayaKosha || {
        dailyObservations: [],
        annualActivities: [],
      },
      vidnyanmayaKosha: vidnyanmayaKosha || {
        marks: [],
        maunAbhyasActivities: {
          mukhyaVishay: [],
          anubhavLekhan: [],
          charitryaAbhyas: [],
          prakatVachan: [],
          rasGrahan: [],
        },

        varshikUpakram: [],
      },
      anandmayaKosha: anandmayaKosha || {
        dailyObservations: [],
        annualActivities: [],
      },
    });

    const createdResultFormat = await resultFormat.save();
    res.status(201).json(createdResultFormat);
  });
  
const fetchAllResultFormats = asyncHandler(async (req, res) => {
    const resultFormats = await ResultFormat.find({});
    res.json(resultFormats);
  });

  const getResultFormatByStandard = asyncHandler(async (req, res) => {
    const { standard } = req.params;
    const { academicYear } = req.query;

    const resultFormat = await ResultFormat.findOne({ standard, academicYear });

    if (resultFormat) {
      res.json(resultFormat);
    } else {
      res.status(404);
      throw new Error(
        "Result format not found for this standard and academic year"
      );
    }
  });


  export {
    getResultFormats,
    getResultFormatById,
    createResultFormat,
    updateResultFormat,
    deleteResultFormat,
    fetchAllResultFormats,
    getResultFormatByStandard,
  };
