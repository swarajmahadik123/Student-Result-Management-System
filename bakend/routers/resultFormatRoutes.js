import express from "express";
import {
  getResultFormats,
  getResultFormatById,
  createResultFormat,
  updateResultFormat,
  deleteResultFormat,
  fetchAllResultFormats,
  getResultFormatByStandard,
} from "../controllers/resultFormatController.js";

const router = express.Router();

router.route("/").get(getResultFormats).post(createResultFormat);

router.get("/result-formats", fetchAllResultFormats);

// routes/resultFormatRoutes.js

router.get("/standard/:standard", getResultFormatByStandard);

router
  .route("/:id")
  .get(getResultFormatById)
  .put(updateResultFormat)
  .delete(deleteResultFormat);

export default router;
