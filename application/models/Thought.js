const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: [{ type: Schema.Types.ObjectId }],
    reactionBody: [{ type: String, required: true, max: 280 }],
    username: [{ type: String, required: true, }],
    createdAt: [{ type: Date, default: Date.now }]
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280},
    createdAt: { type: Date, default: Date.now, },
    username: { type: String, required: true },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

const reactionData = [
  {
    reactionBody: "wow that was crazy",
    username: "casen124"
  },{
    reactionBody: "no way!",
    username: "LUCK1222"
  }
]

// Initialize the Comment model
const Thought = model('thought', thoughtSchema);

// Thought.create(
//   {
//     thoughtText: "I love trains man",
//     username: "someonone",
//     reactions: reactionData
//   },
//   (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(data);
//   }
// )
module.exports = Thought;
