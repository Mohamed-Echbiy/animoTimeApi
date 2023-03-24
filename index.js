const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const favoritesRoutes = require("./routes/favouritsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
const episodeLinksRoute = require("./routes/getEpLinks");
//

const app = express();

//
app.use(compression());
app.use(cors());
app.use(express.json());
app.use("/", favoritesRoutes);
app.use("/", commentsRoutes);
app.use("/", episodeLinksRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(8000, () => {
      console.log(`we are connected on port 8000`);
    })
  )
  .catch((err) => console.log(err));
