const { Schema, model, Types } = require('mongoose');

// Create the User Schema:
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    
}
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Create friend count virtual to retrieve length of friends array:
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


// Create User model using UserSchema:
const User = model('User', UserSchema);

module.exports = User;