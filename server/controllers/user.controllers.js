const db = require("../models");
const User = db.user;

//Get User Details

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
    // console.log(err.message);
  }
};

//user friends

exports.getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, userName, occupation, location }) => {
        return { _id, userName, occupation, location };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Adding and removing friend list

exports.updateFriendList = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById({ _id: id });
    const friend = await User.findById({ _id: friendId });
    // console.log({ user });

    // console.log(user.friends.includes(friendId));
    // console.log(id,friendId);
    // console.log([user.friends]);
    // console.log(user.friends.indexOf(friendId));

    if (user.friends.indexOf(friendId) >= 0) {
      user.friends.splice(user.friends.indexOf(friendId), 1);

      friend.friends.splice(friend.friends.indexOf(id), 1);
      // friend.friends=friend.friends.map((uid)=>uid!==id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    // console.log([friends]);
    const formattedFriends = friends.map(
      ({ _id, userName, occupation, location }) => {
        return { _id, userName, occupation, location };
      }
    );

    res.status(200).json(formattedFriends);
    // console.log(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
    // console.log(err.message);
  }
};

exports.friendSuggetion = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await User.find().select(["-password"]);
    // console.log("users fetched");

    const logInuser = await User.findById({ _id: id });

    logInuser.friends.push(id);

    // console.log("login user fetched");

    let friendsToSuggest = users.filter(
      (user) => !logInuser.friends.includes(user._id)
    );

    // console.log(friendsToSuggest);
    res.status(200).json(friendsToSuggest);
  } catch (err) {
    res.status(500).json({ message: err.message });
    // console.log(err.message);
  }
};
