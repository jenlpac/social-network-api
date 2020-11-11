const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts:
    getAllThought(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get one thought by id:
    getThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                // If no Thought is found:
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found by that id!" });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    // Create a new thought:
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Update a thought by id:
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                // If no thought is found:
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found by that id!" });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a thought by id:
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No thought found by that id!" });
                }
                return User.findOneAndUpdate(
                    { thoughts: params.thoughtId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
                
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found by that id!" });
                    return;
                };
                res.json({ dbUserData, message: 'This thought has been deleted!'});
            })
            .catch(err => res.status(400).json(err))
        
    },

    // Create reaction:
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found by that id!" });
                return;
            }         
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },

    // Delete reaction:
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found by that id!" });
                    return;
                }
                res.json({ dbThoughtData, message: "Reaction has been deleted!" });
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;