const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    by: {
      userName: { type: String, required: [true, "please provide userName"] },
      id: { type: String, required: [true, "please provide user Id"] },
    },
    comment: {
      type: String,
      required: [true, "you need to provide the comment"],
    },
    reactions: {
      dislike: [{ id: String }],
      like: [{ id: String }],
    },
    animeEpId: {
      type: Number,
      required: [true, "the animeId where the comment about "],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", schema);
