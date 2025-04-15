import { model, Schema } from "mongoose";

const songSchema = new Schema(
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
    audioURL: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    albumId: {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
  },
  { timestamps: true }
);

const Song = model("Song", songSchema);

export default Song;
