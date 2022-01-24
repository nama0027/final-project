import mongoose from 'mongoose';
import crypto from 'crypto';

const MemberSchema = new mongoose.Schema({
  photo: String,

  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  e_mail: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  address: {
    type: String,
  },

  membership_type: String,
  status: String,

  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Children',
    },
  ],

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],

  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
    maxlength: 16,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

const Member = mongoose.model('Member', MemberSchema);

export default Member;
