import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
  },

  eventType: {
    type: String,
    default: 'family',
    enum: ['kids', 'family', 'individuals'],
  },

  eventDate: {
    type: Date,
    required: true,
  },

  eventTime: { type: String, required: true },

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
