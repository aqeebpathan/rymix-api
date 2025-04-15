import Album from "../models/album.model.js";
import Song from "../models/song.model.js";
import AppResponse from "../utils/AppResponse.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return AppResponse.error(res, "Please upload all files");
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // upload to Cloudinary
    const audioUpload = await uploadToCloudinary(audioFile).catch(() => null);
    const imageUpload = await uploadToCloudinary(imageFile).catch(() => null);

    if (!audioUpload || !imageUpload) {
      return AppResponse.error(res, "File upload failed. Please try again.");
    }

    const song = new Song({
      title,
      artist,
      audioURL: audioUpload,
      imageURL: imageUpload,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      const album = await Album.findById(albumId);
      if (album) {
        await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
      }
    }

    return AppResponse.success(res, "Song uploaded", song, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return AppResponse.error(res, "Song not found", 404);
    }

    // remove song reference from album if it exists
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);

    return AppResponse.success(res, "Song deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUpload = await uploadToCloudinary(imageFile).catch(() => null);

    if (!imageUpload) {
      return AppResponse.error(res, "File upload failed. Please try again.");
    }

    const album = new Album({
      title,
      artist,
      imageURL: imageUpload,
      releaseYear,
    });

    await album.save();

    return AppResponse.success(res, "Album created successfully", album, 201);
  } catch (error) {
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    return AppResponse.success(res, "Album deleted successfully");
  } catch (error) {
    next(error);
  }
};
