import mongoose from 'mongoose';
import crypto from 'crypto';

import { customAlphabet } from 'nanoid';

const alphabet = 'PKFU2022';
const nanoid = customAlphabet(alphabet, 9);

const MemberSchema = new mongoose.Schema({
  photo: String,

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  e_mail: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  membershipType: {
    type: String,
    enum: [
      'individual',
      'family',
      'studentIndividual',
      'studentFamily',
      'retiredIndividual',
      'retiredFamily',
    ],
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'expired', 'terminated'],
    default: 'pending',
  },

  membershipNumber: {
    type: String,
    default: () => nanoid(),
  },

  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Children',
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

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
});

const Member = mongoose.model('Member', MemberSchema);

export default Member;
