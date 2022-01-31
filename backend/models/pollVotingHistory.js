import mongoose from 'mongoose';

const PollHistorySchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: () => new Date(),
  },

  updatedAt: {
    type: Date,
  },

  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PollQuestions',
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PollAnswers',
  },

  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  },
});

const PollHistory = mongoose.model('PollHistory', PollHistorySchema);

export default PollHistory;
