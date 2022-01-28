import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  description: {
    type: String,
    enum: ['member', 'admin', 'executive'],
    default: 'member',
  },
});

const Role = mongoose.model('Role', RoleSchema);

export default Role;
