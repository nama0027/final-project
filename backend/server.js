import express from 'express';
import listEndPoints from 'express-list-endpoints'; // for listing all routes
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

const User = mongoose.model('User', UserSchema);

const ThoughtSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

const Thought = mongoose.model('Thought', ThoughtSchema);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ response: 'Please, log in', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Start defining your routes here
app.get('/', async (req, res) => {
  res.send(
    'welcome to the authentication API. For all end points visit: https://user-autherisation.herokuapp.com/endpoints '
  );
});

// this will list all routes
app.get('/endpoints', async (req, res) => {
  res.send(listEndPoints(app));
});

app.get('/thoughts', authenticateUser);
app.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find({});
  res.status(201).json({ response: thoughts, success: true });
});

app.post('/thoughts', async (req, res) => {
  const { message } = req.body;

  try {
    const newThought = await new Thought({ message }).save();
    res.status(201).json({ response: newThought, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 6) {
      throw { message: 'Password must be at least 6 characters long' };
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

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
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
