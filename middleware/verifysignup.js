const db = require("../models");

const User = db.user;

exports.checkDuplicateEmail = (req, res, next) => {
  // Username
//  console.log({req:req.body});

    // Email
    User.findOne({
      email: req.body.email
    }).exec()
    .then((user,err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  }



