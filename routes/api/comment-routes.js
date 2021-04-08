//setup comment routes

const router = require("express").Router();

//import methods from comment-controller file:
const {
  addComment,
  removeComment,
} = require("../../controllers/comment-controller");

//1. set up route called /api/comments/:pizzaId and use the addComment() method as a POST callback.

//api/comments/pizzaId
router.route("/:pizzaId").post(addComment);

//2. then set up another route for /api/comments/:pizzaId/:commentId and use the removeComment method as a DELETE callback

//api/comments/pizzaId/commentId

router.route("/:pizzaId/:commentId").delete(removeComment);

//3. lastly, export the routes to /routes/api/index.js. give these routes the prefix of /comments.

module.exports = router;
