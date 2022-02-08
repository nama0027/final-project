import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },

  eventType: {
    type: String,
    default: 'general',
    enum: ['kids', 'cultural', 'integration', 'general'],
  },

  eventDate: {
    type: Date,
    required: true,
  },

  eventTime: { type: Number, required: true },

  eventVenue: {
    type: String,
  },

  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
