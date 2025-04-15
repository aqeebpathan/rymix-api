import AppResponse from "../utils/AppResponse.js";
import Playlist from "../models/playlist.model.js";
import Song from "../models/song.model.js";

/**
 * @desc   Create a new playlist
 * @route  POST /api/playlists
 * @access Private
 */
export const createPlaylist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, isPublic } = req.body;

    if (!name) {
      return AppResponse.error(res, "Playlist name is required.", 400);
    }

    const existingPlaylist = await Playlist.findOne({ name, userId });
    if (existingPlaylist) {
      return AppResponse.error(
        res,
        "A playlist with this name already exists.",
        400
      );
    }

    const newPlaylist = new Playlist({
      name,
      userId,
      isPublic,
      songs: [],
    });
    await newPlaylist.save();

    return AppResponse.success(
      res,
      "Playlist created successfully.",
      newPlaylist,
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Add a song to a playlist
 * @route  PUT /api/playlists/:playlistId/add-song
 * @access Private
 */
export const addSongToPlaylist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { songId } = req.body;
    const { playlistId } = req.params;

    const playlist = await Playlist.findOne({
      _id: playlistId,
      userId,
    });

    if (!playlist) {
      return AppResponse.error(res, "Playlist not found.", 404);
    }

    if (playlist.songs.includes(songId)) {
      return AppResponse.error(res, "Song already in playlist.", 400);
    }

    const song = await Song.findById(songId);
    if (!song) {
      return AppResponse.error(res, "Song not found.", 404);
    }

    playlist.songs.push(songId);
    await playlist.save();

    return AppResponse.success(res, "Song added to playlist.", playlist, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get all playlists for a user
 * @route  GET /api/playlists
 * @access Private
 */
export const getUserPlaylists = async (req, res, next) => {
  try {
    const userId = req.userId;
    const playlists = await Playlist.find({ userId });

    if (!playlists.length) {
      return AppResponse.success(res, "No playlists found.", [], 200);
    }

    return AppResponse.success(
      res,
      "Playlists retrieved successfully.",
      playlists,
      200
    );
  } catch (error) {
    next(error);
  }
};

// export const getUserPlaylists = async (req, res, next) => {
//   try {
//     const userId = req.userId;
//     const playlists = await Playlist.find({ userId }).populate("songs");

//     if (!playlists.length) {
//       return AppResponse.success(res, "No playlists found.", [], 200);
//     }

//     return AppResponse.success(
//       res,
//       "Playlists retrieved successfully.",
//       playlists,
//       200
//     );
//   } catch (error) {
//     next(error);
//   }
// };

/**
 * @desc   Get playlist songs
 * @route  GET /api/playlists/:playlistId
 * @access Private
 */
export const getPlaylistSongs = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { playlistId } = req.params;

    // Find the playlist (either public OR belongs to the user)
    const playlist = await Playlist.findOne({
      _id: playlistId,
      $or: [{ isPublic: true }, { userId }],
    }).populate("songs");

    if (!playlist) {
      return AppResponse.error(res, "Playlist not found or is private.", 404);
    }

    return AppResponse.success(
      res,
      "Playlist songs retrieved successfully.",
      playlist
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Delete a playlist
 * @route  DELETE /api/playlists/:playlistId
 * @access Private
 */
export const deletePlaylist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { playlistId } = req.params;

    const playlist = await Playlist.findOne({ _id: playlistId, userId });

    if (!playlist) {
      return AppResponse.error(
        res,
        "Playlist not found or access denied.",
        404
      );
    }

    await Playlist.deleteOne({ _id: playlistId });

    return AppResponse.success(
      res,
      "Playlist deleted successfully.",
      null,
      200
    );
  } catch (error) {
    next(error);
  }
};
