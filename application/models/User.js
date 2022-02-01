const { Schema, model } = require('mongoose');
const Thought = require('./Thought');
// Schema to create Post model
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true},
    email: { type: String,
      required: true,
      unique: true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{ type: Schema.Types.String, ref: 'thought' }],
    friends: [{ type: Schema.Types.String, ref: 'user'}],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

userSchema.pre('remove', function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  let somehting = this;
  Thought.remove({ username: this.username }, next);
});

const User = model('user', userSchema);

module.exports = User;
