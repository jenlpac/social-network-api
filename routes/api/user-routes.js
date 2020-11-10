const router = require('express').Router();

const {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user.controller');

// Route /api/users:
router
    .route('/api/users')
    .get(getAllUser)
    .post(createUser)

router
    .route('/api/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

// Route /api/users/:userId/friends/:friendId


// Route /api/thoughts:


// Route /api/thoughts/:thoughtId/reactions

module.exports = router;