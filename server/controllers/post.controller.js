const db = require("../models");
const User = db.user;
const Post = db.post;

//creata a post
exports.createPost = async (req, res) => {
  try {
    const { userId, content, location, category } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      userName: user.userName,
      location,
      content,
      category,
      likes: new Map(),
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//read a post
exports.getFeedposts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// update

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    // console.log({id,userId});
    const post = await Post.findById(id);
    // console.log(post.likes?.size);

    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    // console.log(err);
    res.status(404).json({ message: err.message });
  }
};
exports.filteredPost = async (req, res) => {
  try {
    let category = req.query.category || "All";
    // const {category}=req.params;
    const categoryOptions = [
      "Technology",
      "Travel",
      "Sports",
      "Education",
      "AutoBio",
      "Reviews",
      "",
    ];

    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));

    const post = await Post.find()
      .where("category")
      .in([...category])
      .sort({ createdAt: -1 });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
