import express from 'express';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

//-------------importing models----------------//
import Announcement from '../models/announcement.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//---------------------------for file upload------------------//
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

//-------------------Post Announcement---------------------------------//

router.post(
  '/announcement',
  authenticateUser,
  authenticateRole,
  uploadStorage.single('file'),
  async (req, res) => {
    const { description, announcementType } = req.body;
    const { user } = res.locals;
    try {
      const newAnnouncement = await new Announcement({
        description,
        announcementType,
        uploadedFile: req.file.filename,
        postedBy: user.firstName,
      }).save();
      res.status(201).json({ response: newAnnouncement, success: true });
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);

//-------------------Get Announcement---------------------------------//

export default router;
