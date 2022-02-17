import express from 'express';
import { parser } from '../utils/fileStorage.js';

//-------------importing models----------------//
import Announcement from '../models/announcement.js';
import File from '../models/file.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//-------------------Post Announcement---------------------------------//

router.post(
  '/announcement',
  authenticateUser,
  authenticateRole,
  parser.single('fileName'),
  async (req, res) => {
    const { values } = req.body;
    const { user } = res.locals;
    const dataObject = JSON.parse(values);
    const { description, announcementType } = dataObject;

    try {
      if (req.file) {
        const newFile = await new File({
          filePath: req.file.path,
          public_id: req.file.filename,
        }).save();

        if (newFile) {
          const newAnnouncement = await new Announcement({
            description,
            announcementType,
            uploadedFile: newFile,
            postedBy: user.firstName,
          }).save();
          res.status(201).json({ response: newAnnouncement, success: true });
        } else {
          res
            .status(404)
            .json({ response: 'File not uploaded', success: false });
        }
      } else {
        const newAnnouncement = await new Announcement({
          description,
          announcementType,
          postedBy: user.firstName,
        }).save();
        res.status(201).json({ response: newAnnouncement, success: true });
      }
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);
//-------------------Get Announcement---------------------------------//
router.get('/announcements', authenticateUser, async (req, res) => {
  try {
    const allAnnouncements = await Announcement.find()
      .populate('uploadedFile')
      .sort({ createdAt: -1 })
      .exec();
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
      const announcementForDelete = await Announcement.findById(
        announcementId
      ).populate('uploadedFile');
      if (announcementForDelete) {
        if (announcementForDelete.public_id) {
          await cloudinary.uploader.destroy(announcementForDelete.public_id);
          const deletedFile = await File.findOneAndDelete({
            _id: announcementForDelete._id,
          });
        }
        const deletedAnnouncement = await Announcement.findOneAndDelete({
          _id: announcementId,
        });
        if (deletedAnnouncement) {
          res.status(200).json({
            response: { deletedAnnouncement },
            success: true,
          });
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
