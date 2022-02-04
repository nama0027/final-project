import express from 'express';
import cloudinaryFramework from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

//-------------importing models----------------//
import Announcement from '../models/announcement.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//-------------------------setting up dotenv-------------------//
dotenv.config();

//------------------------------------------------------------//

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: 'pkfu', // this needs to be whatever you get from cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//---------------------------for file upload------------------//
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'files',
    allowedFormats: ['jpeg', 'jpg', 'png', 'pdf'],
  },
});
const parser = multer({ storage: storage });

//-------------------Post Announcement---------------------------------//

router.post(
  '/announcement',
  authenticateUser,
  authenticateRole,
  parser.single('fileName'),
  async (req, res) => {
    const { description, announcementType } = req.body;
    const { user } = res.locals;
    try {
      const newAnnouncement = await new Announcement({
        description,
        announcementType,
        fileName: req.file.path,
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
