import { Router } from "express";

import {
  createPlaylist,
  deletePlaylist,
  getUserPlaylists,
  getPlaylistSongs,
  addSongToPlaylist,
} from "../controllers/playlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/", getUserPlaylists);
router.post("/", createPlaylist);

router.get("/:playlistId", getPlaylistSongs);
router.delete("/:playlistId", deletePlaylist);

router.put("/:playlistId/add-song", addSongToPlaylist);

export default router;
