const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },

    location: String,
    content: String,
    category: String,
    // picturePath: String,
    // userPicturePath: String,

    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
