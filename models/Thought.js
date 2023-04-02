const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

// the reactionSchema defines the shape for reaction subdocument 
const reactionSchema = new Schema({
  reactionId: { 
    type: Schema.Types.ObjectId, 
    default: () => new Types.ObjectId() 
  },
  reactionBody: { 
    type: String, 
    required: true, 
    maxLength: 280
  },
  username: { 
    type: String, 
    required: true
  },
  createdAt: {
    type: Date,
    default: DateTime.now(),
    get: formattedTime
  },
},{ toJSON: { getters: true } });

function formattedTime(createdAt) {
  const formateTime = (new DateTime(createdAt)).toLocaleString(DateTime.DATETIME_FULL);
  return formateTime;
}

// Schema to create User model
const thoughtSchema = new Schema(
  {
  thoughtText:  { 
    type: String, 
    required: true, 
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: DateTime.now(),
    get: formattedTime
  },
  username: { 
    type: String, 
    required: true
  },
  //Array of nested documents created with the reactionSchema
  reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

// Create a virtual property `reactionCount  ` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount ').get(function () {
  return this.reactions.length;
});

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;