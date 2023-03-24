const express = require("express");
const { getLinks } = require("../controllers/StreamLinkController");
const router = express.Router();

router.get("/api/links/:Idname", getLinks);
module.exports = router;
