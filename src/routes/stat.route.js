import { Router } from "express";

import { getStats } from "../controllers/stat.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getStats);

export default router;
