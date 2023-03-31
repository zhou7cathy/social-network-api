const { Schema, model } = require('mongoose');

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
    default: Date.now,
    get//Todo:Use a getter method to format the timestamp on query
  },
});

// format_date: (date) => {
//   // Format date as DD/MM/YYYY HH:MM:SS
//   return [
//   date.getDate(),
//   date.getMonth()+1,
//   date.getFullYear()].join('/')+' '+ 'at'+' '+
//    [date.getHours(),
//     date.getMinutes(),
//     date.getSeconds()].join(':');
// },
  
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
    default: Date.now,
    get//Todo:Use a getter method to format the timestamp on query
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
      gettter: true
    },
    id: false,
  }
);

// Create a virtual property `reactionCount  ` that gets the amount of reactions per thought
userSchema.virtual('reactionCount ').get(function () {
  return this.reactions.length;
});

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;