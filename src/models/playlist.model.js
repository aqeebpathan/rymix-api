import { model, Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Playlist = model("Playlist", playlistSchema);

export default Playlist;
