const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const favoritesRoutes = require("./routes/favouritsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");
//

const app = express();

//
app.use(
  cors({
    origin: ["https://animo-timev3.vercel.app", "http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/", favoritesRoutes);
app.use("/", commentsRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(8000, () => {
      console.log(`we are connected on port 8000`);
    })
  )
  .catch((err) => console.log(err));
