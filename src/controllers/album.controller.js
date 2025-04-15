import mongoose from "mongoose";
import Album from "../models/album.model.js";
import AppResponse from "../utils/AppResponse.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const albums = await Album.find()
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    return AppResponse.success(res, "All albums", albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return AppResponse.error(
        res,
        "Oops! The album ID is not valid. Please check and try again.",
        404
      );
    }

    const album = await Album.findById(id).populate("songs").exec();

    if (!album) {
      return AppResponse.error(res, "Album not found", 404);
    }

    return AppResponse.success(res, "Fetch album", album);
  } catch (error) {
    next(error);
  }
};
