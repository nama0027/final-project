import mongoose from 'mongoose';
import Member from './member.js';

const BoardSchema = new mongoose.Schema({
  description: {
    type: String,
    enum: ['BM', 'CH', 'VCH', 'GS', 'TR', 'PR', 'PO'],
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
});

const Board = mongoose.model('Board', BoardSchema);

export default Board;
