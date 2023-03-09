const db = require("../schema/comments");

const getAllUserComments = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const fetchData = await db.find({ "by.id": id });
    res.status(200).json({ data: fetchData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTheComments = async (req, res) => {
  const id = req.params.id;
  try {
    const fetchData = await db.find({ animeEpId: id });
    res.status(200).json({ data: fetchData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  const body = req.body;
  try {
    const addComment = await db.create({ ...body });
    res.status(200).json({ data: addComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteComment = await db.findByIdAndDelete(id);
    res.status(200).json({ data: { message: "the comment has been deleted" } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateComment = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updateComment = await db.findByIdAndUpdate(id, { ...body });
    res.status(200).json({ data: { message: "the comment has been updated" } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const CommentReactions = async (req, res) => {
  const { id } = req.params;
  const { type, user } = req.query;

  try {
    const findDoc = await db.findById(id);
    console.log(findDoc);
    const allReactions = [
      ...findDoc.reactions.like,
      ...findDoc.reactions.dislike,
    ];
    /* check if the doc has values in the array of the like:
     {reaction:{like:[{id:"value"}]},dislike:[{id:"balue"}]}
     */
    console.log("the first step after / ", allReactions.length);
    if (allReactions.length) {
      console.log("the all reaction condition started", !!allReactions);
      const isTheUserReacted = findDoc.reactions.like.filter(
        (e) => e.id === user
      );
      if (isTheUserReacted.length) {
        const removeTheLikedUsr = findDoc.reactions.like.filter(
          (e) => e.id !== user
        );

        // here we remove the user that we found and we update the like array

        const removeTheLike = await db.findByIdAndUpdate(id, {
          "reactions.like": removeTheLikedUsr,
        });

        // we check if the user change from like to dislike

        if (type === "dislike") {
          const makeItLiked = await db.findOneAndUpdate(
            { _id: id },
            {
              "reactions.dislike": [...findDoc.reactions.dislike, { id: user }],
            }
          );
        }
        return res
          .status(200)
          .json({ data: { message: "the doc has been updated" } });
      }

      //todo
      // this the first part if the user has made a like to the comment
      //todo

      const isTheUserDisliked = findDoc.reactions.dislike.filter(
        (e) => e.id === user
      );
      // here we remove the user that we found and we update the dislike array

      if (isTheUserDisliked.length) {
        const removeDislikeUsr = findDoc.reactions.dislike.filter(
          (e) => e.id !== user
        );
        const removeTheDislke = await db.findByIdAndUpdate(id, {
          "reactions.dislike": removeDislikeUsr,
        });
        // here we check if the user change from dislike to like and we do the same
        if (type === "like") {
          const makeItLiked = await db.findOneAndUpdate(
            { _id: id },
            { "reactions.like": [...findDoc.reactions.like, { id: user }] }
          );
        }
        return res.status(200).json({
          data: { message: "the doc has been updated condition disliked" },
        });
      }
    }

    //
    //

    const whatType =
      type === "like" ? findDoc.reactions.like : findDoc.reactions.dislike;
    const arrayOfValues = whatType;
    if (type === "like") {
      const updateDoc = await db.findOneAndUpdate(
        { _id: id },
        { "reactions.like": [...arrayOfValues, { id: user }] }
      );
      return res
        .status(200)
        .json({ data: { message: "the doc is updated like" } });
    } else {
      const updateDoc = await db.findOneAndUpdate(
        { _id: id },
        { "reactions.dislike": [...arrayOfValues, { id: user }] }
      );
      return res
        .status(200)
        .json({ data: { message: "the doc is updated dislike" } });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getTheComments,
  addComment,
  deleteComment,
  updateComment,
  getAllUserComments,
  CommentReactions,
};
