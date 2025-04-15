import Song from "../models/song.model.js";
import User from "../models/user.model.js";
import Album from "../models/album.model.js";
import AppResponse from "../utils/AppResponse.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, unqiueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    return AppResponse.success(res, "Fetch stats", {
      totalSongs,
      totalAlbums,
      totalUsers,
      totalArtists: unqiueArtists[0]?.count || 0,
    });
  } catch (error) {
    next(error);
  }
};
