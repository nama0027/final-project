import mongoose from 'mongoose';

const PollQuestionsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
  },
  postedBy: String,
});

const PollQuestions = mongoose.model('PollQuestions', PollQuestionsSchema);

export default PollQuestions;
