const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
  username:  { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount ` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
