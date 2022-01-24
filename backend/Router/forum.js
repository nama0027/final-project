import express from 'express';
import listEndPoints from 'express-list-endpoints'; // for listing all routes
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//-------------importing models----------------//
import Member from '../models/member.js';
import Role from '../models/role.js';
import authenticateUser from '../utils/authenticate.js';

//---------------importing middleware--------------------------//

//-------------------Router---------------------------------//
const router = express.Router();

//---------------------database ---------------------------//

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/PKFU';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

////////////////////////midleware----------------------------////////

//--------------------------Routes----------------------------------//

router.get('/', async (req, res) => {
  res.send(
    'welcome to the authentication API. For all end points visit: https://user-autherisation.herokurouter.com/endpoints '
  );
});

// this will list all routes
router.get('/endpoints', async (req, res) => {
  res.send(listEndPoints(router));
});

router.get('/thoughts', authenticateUser);
router.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find({});
  res.status(201).json({ response: thoughts, success: true });
});

router.post('/thoughts', async (req, res) => {
  const { message } = req.body;

  try {
    const newThought = await new Thought({ message }).save();
    res.status(201).json({ response: newThought, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//--------------updating member's role-------------//

router.get('/members', async (req, res) => {
  try {
    const allUsers = await Member.find().exec();
    return allUsers
      ? res.json(allUsers)
      : res.json({ success: false, message: 'No users in the database' });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//----------------signup/signin------------------------
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 6) {
      throw { message: 'Password must be at least 6 characters long' };
    }

    const newMember = await new Member({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      response: {
        userId: newMember._id,
        username: newMember.username,
        accessToken: newMember.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Member.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
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

//--------------------Create role-------------//
router.post('/role', async (req, res) => {
  const { description } = req.body;
  try {
    const newRole = await new Role({ description }).save();
    res.status(201).json({ response: newRole, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

export default router;
