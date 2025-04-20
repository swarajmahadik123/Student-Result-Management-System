import HindaviResultFormat from "../models/HindaviResultFormat.js";

export const fetchAllHindaviResultFormats = async (req, res) => {
  try {
    const resultFormats = await HindaviResultFormat.find();
    res.json(resultFormats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getHindaviResultFormatById = async (req, res) => {
  try {
    const resultFormat = await HindaviResultFormat.findById(req.params.id);
    if (!resultFormat) {
      return res.status(404).json({ message: "Result format not found" });
    }
    res.json(resultFormat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createHindaviResultFormat = async (req, res) => {
  try {
    const resultFormat = new HindaviResultFormat(req.body);
    await resultFormat.save();
    res.status(201).json(resultFormat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateHindaviResultFormat = async (req, res) => {
  try {
    const updatedResultFormat = await HindaviResultFormat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResultFormat) {
      return res.status(404).json({ message: "Result format not found" });
    }
    res.json(updatedResultFormat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteHindaviResultFormat = async (req, res) => {
  try {
    await HindaviResultFormat.findByIdAndRemove(req.params.id);
    res.json({ message: "Result format deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
