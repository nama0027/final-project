import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
  filePath: {
    type: String,
  },
  public_id: {
    type: String,
  },
});

const File = mongoose.model('File', FileSchema);

export default File;
