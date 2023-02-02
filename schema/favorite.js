const mongoose = require("mongoose");

//

const schema = new mongoose.Schema({
  by: {
    type: String,
    required: [true, "please you need to be authorized to perform this action"],
  },
  title: {
    type: String,
    required: [true, "you need to add title property"],
  },
  genres: {
    type: [String],
  },
  image: { type: String, required: [true, "you need to add image property"] },
  id: { type: String, required: [true, "you need the id property"] },
  rating: { type: Number, required: [true, "you need the rating property"] },
  type: {
    type: String,
    required: [
      true,
      "please set type between plan to watch, completed, watching",
    ],
  },
});

module.exports = mongoose.model("favourits", schema);
