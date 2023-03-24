const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "please provide "] },
    links: {
      type: [{}],
      required: [true, "the links is required for to access the videos url"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("streamLinks", schema);
