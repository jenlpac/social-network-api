const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const { truncate } = require('fs');


// Create Reaction Schema:
const ReactionSchema = new Schema({
    reactionId: {
        // Use ObjectId data type:
        type: Schema.Types.ObjectId,
        // Set default to new ObjectId:
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


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

// Virtual to retrieve the length of the reactions array:
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought, ThoughtSchema');

module.exports = Thought;