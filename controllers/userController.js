const { Thought, User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Updates a user using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => {  
        res.status(500).json(err) 
      });
  },

  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true  }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json({ message: 'Friend successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};


