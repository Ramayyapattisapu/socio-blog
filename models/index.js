const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model")(mongoose);
db.post=require("./post.model.js");




module.exports = db;