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
  cloud_name: process.env.CLOUDINARY_NAME, // this needs to be whatever you get from cloudinary
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
        filePath: req.file.path || '',
        public_id: req.file.filename || '',
        postedBy: user.firstName,
      }).save();
      res.status(201).json({ response: newAnnouncement, success: true });
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);
//-------------------Get Announcement---------------------------------//
router.get('/announcements', authenticateUser, async (req, res) => {
  try {
    const allAnnouncements = await Announcement.find().exec();
    if (allAnnouncements) {
      res.status(200).json({ response: allAnnouncements, success: true });
    } else {
      res.json({ success: false, message: 'No announcement available' });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//-------------------Delete Announcement---------------------------------//
router.delete(
  '/announcements/:announcementId',
  authenticateUser,
  authenticateRole,
  async (req, res) => {
    const { announcementId } = req.params;

    try {
      const announcementForDelete = await Announcement.findById(announcementId);
      if (announcementForDelete) {
        await cloudinary.uploader.destroy(announcementForDelete.public_id);
        const deletedAnnouncement = await Announcement.findOneAndDelete({
          _id: announcementId,
        });
        if (deletedAnnouncement) {
          res
            .status(200)
            .json({ response: deletedAnnouncement, success: true });
        } else {
          res
            .status(404)
            .json({ response: 'Announcement not deleted', success: false });
        }
      } else {
        res
          .status(404)
          .json({ response: 'Announcement not found', success: false });
      }
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);

//-------------------Update Announcement---------------------------------//
router.patch(
  '/announcements/:announcementId',
  authenticateUser,
  authenticateRole,

  async (req, res) => {
    const { announcementId } = req.params;
    const { user } = res.locals;
    const { description, announcementType } = req.body;

    try {
      const queriedAnnouncement = await Announcement.findById(announcementId);
      if (queriedAnnouncement) {
        const updateAnnouncement = await Announcement.findByIdAndUpdate(
          announcementId,
          {
            $set: {
              description: description || queriedAnnouncement.description,
              announcementType:
                announcementType || queriedAnnouncement.announcementType,
              postedBy: user.firstName,
            },
          },
          { new: true }
        );
        res.status(201).json({ response: updateAnnouncement, success: true });
      } else {
        res
          .status(404)
          .json({ response: 'Announcement not found', success: false });
      }
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);

export default router;
