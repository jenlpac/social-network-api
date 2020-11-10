const { Schema, model } = require('mongoose');
const moment = require('moment');

// Create the Thought Schema:
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

