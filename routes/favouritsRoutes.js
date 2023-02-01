const express = require("express");
const {
  addFavorite,
  getFavorites,
  deleteFavorite,
} = require("../controllers/favoriteControllers");

//

const router = express.Router();

//

router.get("/api/favorites/:id", getFavorites);

router.delete("/api/removeFavorite", deleteFavorite);

router.post("/api/addFavorite", addFavorite);

//

module.exports = router;
