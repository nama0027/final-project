import express from 'express';
import listEndPoints from 'express-list-endpoints'; // for listing all routes
import bcrypt from 'bcrypt';

//-------------importing models----------------//
import Member from '../models/member.js';

//-------------------Router---------------------------------//
const router = express.Router();

//--------------------------Routes----------------------------------//

router.get('/', async (req, res) => {
  res.send('welcome to the PKU API. For all end points visit:  ');
});

// this will list all routes
router.get('/endpoints', async (req, res) => {
  res.send(listEndPoints(router));
});

////-------------------login--------------------------------------------------////

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Member.findOne({ username })
      .populate('role', {
        description: 1,
        _id: 0,
      })
      .populate('avatar', { filePath: 1, public_id: 0 });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
          role: user.role,
          avatar: user.avatar,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

export default router;
