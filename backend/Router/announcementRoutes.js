import express from 'express';

//-------------importing models----------------//
import Announcement from '../models/announcement.js';

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
  async (req, res) => {
    const { description, announcementType } = req.body;
    const { user } = res.locals;
    try {
      const newAnnouncement = await new Announcement({
        description,
        announcementType,
        postedBy: user.firstName,
      }).save();
      res.status(201).json({ response: newAnnouncement, success: true });
    } catch (error) {
      res.status(400).json({ response: 'failed', success: false });
    }
  }
);

//-------------------Get Announcement---------------------------------//

export default router;
