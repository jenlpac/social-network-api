const { User } = require('../models');

const userController = {
    // Get all users:
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
    // Get one user by id:

    // Post a new user:

    // Update a user by id:

    // Delete a user by id (along with thoughts):


}