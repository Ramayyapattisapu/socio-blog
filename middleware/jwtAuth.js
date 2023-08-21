const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

exports.jwtAuth = (req, res, next) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).send({ message: "No Token provided" });
  }

  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    // else if (req.body.userId !== decode.id) {
    //     return res.status(401).send({
    //         message: "Unauthorized!",
    //     });
    // }
    // console.log(decode);
    req.userId = decode.id;
    next();
  });
};
