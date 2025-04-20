import express from "express";
import {
  getHindaviResultFormatById,
  createHindaviResultFormat,
  updateHindaviResultFormat,
  deleteHindaviResultFormat,
  fetchAllHindaviResultFormats,
} from "../controllers/HindaviResultFormat.js";

const router = express.Router();
router.get("/", fetchAllHindaviResultFormats);
router.get("/resultFormats/:id", getHindaviResultFormatById);
router.post("/resultFormats", createHindaviResultFormat);
router.put("/resultFormats/:id", updateHindaviResultFormat);
router.delete("/resultFormats/:id", deleteHindaviResultFormat);

export default router;
