import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { login, verify } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/verify", authenticate(), verify);

export default router;
