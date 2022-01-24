import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  sender: String,
  receiver: String,
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
