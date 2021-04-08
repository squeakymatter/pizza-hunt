const { Comment, Pizza } = require("../models");

const commentController = {
  //add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } }, //push method adds data to array. MongoDB functions start w/ $
          { new: true } //option new: true passed in so we'll receive back updated pizza (i.e., pizza with new comment included)
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  //remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId }) //findOneAndDelete() deletes document while returning its data. then take that data use it to id and remove it from associated pizza using Mongo $pull operation. finally, return the updated pizza data, now without the _id of the comment in the comments arary and return it to the user

      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
