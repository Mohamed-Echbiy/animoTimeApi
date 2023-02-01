const db = require("../schema/favorite");

const getFavorites = async (req, res) => {
  const id = req.params.id;
  try {
    const getFavorites = await db.find({ by: id });
    res.status(200).json({ data: getFavorites });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteFavorite = await db.deleteOne({ _id });
    res.status(200).json({ msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

const addFavorite = async (req, res) => {
  const body = req.body;
  try {
    const addDoc = await db.create({ ...body });
    res.status(200).json({ msg: "your anime has been added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { addFavorite, getFavorites, deleteFavorite };
