import { Router } from "express";
import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
  getSongTitles,
} from "../controllers/song.controller.js";

const router = Router();

router.get("/", getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);
router.get("/titles", getSongTitles);

export default router;
