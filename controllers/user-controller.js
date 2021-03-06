const { User, Thought } = require('../models');

const userController = {
    // Get all users:
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get one user by id:
    getUser({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found:
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found by that id!" });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    // Create a new user:
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserDate => res.json(dbUserDate))
            .catch(err => res.status(400).json(err));
    },

    // Update a user by id:
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                // If no user is found:
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found by that id!" });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a user by id:
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found by that id!" });
                    return;
                }
                res.json({ dbUserData, message: 'This user has been deleted!' })
            })

            .catch(err => res.status(400).json(err));
    },

    // Add friend:
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found by that id!" });
                return;
                }
                res.json(dbUserData)
            })
        .catch(err => res.status(400).json(err));
    },

    // Delete friend:
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }

}

module.exports = userController;