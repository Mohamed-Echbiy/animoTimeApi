const express = require("express");
const {
  getTheComments,
  addComment,
  updateComment,
  deleteComment,
  getAllUserComments,
  CommentReactions,
} = require("../controllers/commentController");

const router = express.Router();
//
router.patch("/api/comments/reaction/:id", CommentReactions);
router.get("/api/comments/user/:id", getAllUserComments);
router.get("/api/comments/:id", getTheComments);
router.post("/api/comments", addComment);
router.patch("/api/comments/:id", updateComment);
router.delete("/api/comments/:id", deleteComment);

//

module.exports = router;
