import mongoose from 'mongoose';

const PollAnswersSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },

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
});

const PollAnswers = mongoose.model('PollAnswers', PollAnswersSchema);

export default PollAnswers;
