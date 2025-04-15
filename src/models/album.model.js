import { model, Schema } from "mongoose";

const albumSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  { timestamps: true }
);

const Album = model("Album", albumSchema);

export default Album;
