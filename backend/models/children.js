import mongoose from 'mongoose';

const ChildrenSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  memberId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

const Children = mongoose.model('Children', ChildrenSchema);

export default Children;
