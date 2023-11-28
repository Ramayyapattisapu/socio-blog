const auth = require("../controllers/auth.controller");
const verifySignup = require("../middleware/verifysignup.js");

const router = require("express").Router();

router.post(
  "/signUp",
  verifySignup.checkDuplicateEmail,
  auth.signUp //Registration
);

router.post("/signIn", auth.signIn); //LogIn

router.get("/users", auth.allUsers); //to get user details (no need to use)

module.exports = router;
