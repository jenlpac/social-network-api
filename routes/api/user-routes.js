const router = require('express').Router();

const {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Route /api/users:
router
    .route('/')
    .get(getAllUser)
    .post(createUser);


// Route /api/users/:userId:
router
    .route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// Route /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);


module.exports = router;