import express from 'express';

//-------------importing models----------------//
import Message from '../models/message.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//--------------------------Routes----------------------------------//

//*******show all chat messages******/

router.get('/messages', authenticateUser);
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 }).exec();
    if (messages) {
      res.status(201).json({ response: messages, success: true });
    } else {
      res.status(400).json({ response: 'No messages yet!', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//*******post message******/

router.post('/message', authenticateUser, async (req, res) => {
  const { message } = req.body;
  const { user } = res.locals;
  try {
    const newMessage = await new Message({
      message,
      sender: user.firstName,
    }).save();
    res.status(201).json({ response: newMessage, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//*******delete message******/

//----------------------------------------//
export default router;
