import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  event_description: {
    type: String,
    required: true,
  },

  event_type: {
    type: String,
    required: true,
  },

  start_date: {
    type: Date,
    required: true,
  },

  end_date: {
    type: Date,
    required: true,
  },

  event_time: {},

  event_venue: {
    type: String,
  },

  age_limit: {
    type: String,
    required: true,
  },

  event_ticket: {
    type: Number,
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
