import Song from "../models/song.model.js";
import AppResponse from "../utils/AppResponse.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    return AppResponse.success(res, "Fetched all songs", songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const featuredSongs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageURL: 1,
          audioURL: 1,
        },
      },
    ]);

    return AppResponse.success(res, "Fetched featured songs", featuredSongs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  // todo: implement basic algorithm
  try {
    const madeForYouSongs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageURL: 1,
          audioURL: 1,
        },
      },
    ]);

    return AppResponse.success(
      res,
      "Fetched made for you songs",
      madeForYouSongs
    );
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  // todo: implement basic algorithm
  try {
    const trendingSongs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageURL: 1,
          audioURL: 1,
        },
      },
    ]);

    return AppResponse.success(res, "Fetched trending songs", trendingSongs);
  } catch (error) {
    next(error);
  }
};

export const getSongTitles = async (req, res, next) => {
  try {
    const titles = await Song.find({}, "title");

    return AppResponse.success(
      res,
      "Fetched song titles",
      titles.map((song) => song.title)
    );
  } catch (error) {
    next(error);
  }
};
