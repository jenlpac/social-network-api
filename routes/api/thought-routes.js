const router = require('express').Router();

const {
    getAllThought,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts:
router
    .route('/')
    .get(getAllThought);


// /api/thoughts/:userId
router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/:thoughtId:
router
    .route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions:
router
    .route('/:thoughtId/reactions')
    .put(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId:
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;