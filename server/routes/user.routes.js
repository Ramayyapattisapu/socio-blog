const user = require("../controllers/user.controllers.js");
const router = require("express").Router();
const jwtVrification = require("../middleware/jwtAuth.js");

router.get("/:id", jwtVrification.jwtAuth, user.getUser);

router.get("/:id/friends", jwtVrification.jwtAuth, user.getUserFriends);

router.patch("/:id/:friendId", jwtVrification.jwtAuth, user.updateFriendList);

router.get("/:id/suggest", jwtVrification.jwtAuth, user.friendSuggetion);

module.exports = router;
