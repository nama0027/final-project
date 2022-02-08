import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  announcementType: {
    type: String,
    enum: ['public', 'members_only'],
    default: 'members_only',
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  postedBy: String,
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

export default Announcement;
