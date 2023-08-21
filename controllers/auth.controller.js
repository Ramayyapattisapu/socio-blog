const config = require("../config/auth.config");
const db = require("../models/index.js");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  // console.log("in signup");
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8), //nagapramodh
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    location: req.body.location,
    occupation: req.body.occupation,
  });

  user
    .save()
    .then((user) => {
      // console.log(user);
      res.status(201).send({ messaage: "Successfully Registered" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Registration fails", err });
      console.log({ messaage: "Registration failed" }, err);
    });
};

exports.signIn = (req, res) => {
  // console.log("in signIn");
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ email: user.email }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });
      delete user.password;
      // userInfo = {}
      // userInfo.email = user.email;
      // userInfo.userName = user.userName;
      // userInfo.phoneNumber = user.phoneNumber;

      res.status(200).send({
        user,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.allUsers = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  User.find()
    // .select(['-_id'])
    .limit(limit)
    .sort({
      userid: sort,
    })
    .then((users) => {
      // console.log({users});
      res.json(users);
    })
    .catch((err) => console.log(err));
};
