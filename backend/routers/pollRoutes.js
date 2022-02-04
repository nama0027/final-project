import express from 'express';

//-------------importing models----------------//
import PollQuestions from '../models/pollQuestions.js';
import PollAnswers from '../models/pollAnswers.js';
import PollHistory from '../models/pollVotingHistory.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//--------------------------Routes----------------------------------//

//--------------------Create poll Question-------------//
router.post(
  '/question',
  authenticateUser,
  authenticateRole,
  async (req, res) => {
    const { description } = req.body;
    const { user } = res.locals;

    try {
      const newQuestion = await new PollQuestions({
        description,
        postedBy: user.firstName,
      }).save();
      res.status(201).json({ response: newQuestion, success: true });
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);

//--------------------Create poll Answer-------------//
router.post(
  '/question',
  authenticateUser,
  authenticateRole,
  async (req, res) => {
    const { description, questionId } = req.body;
    try {
      const queryQuestion = await PollQuestions.findById(questionId);
      if (queryQuestion) {
        const newAnswer = await new PollAnswers({
          description,
          question: queryQuestion,
        }).save();
        res.status(201).json({ response: newAnswer, success: true });
      } else {
        res
          .status(400)
          .json({ response: 'Question not found', success: false });
      }
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);

//----------------------show poll-------------------------------//

router.get('/poll/:date', authenticateUser, async (req, res) => {
  const { date } = req.params;
  try {
    const currentPoll = await PollQuestions.find({
      createdAt: { $gte: new Date(date), $lt: new Date(date + 1) },
    }).exec();
    if (currentPoll) {
      const questionIds = currentPoll.map((item) => item._id);
      if (questionIds) {
        const pollAnswers = await PollAnswers.find(questionIds);
      }
    } else {
      res.json({ success: false, message: 'No poll available' });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

export default router;

{
  /*
set my filepath for fileupload like this:
 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileExists = !fs.existsSync(
      path.join("uploads", file.originalname)
    );
    if (
      fileExists &&
      (file.mimetype == "application/pdf" ||
        file.mimetype == "text/xml" ||
        file.mimetype == "application/xml" ||
        file.mimetype == "image/jpeg")
    ) {
      cb(null, true);
    } else {
      cb(new Error("File already exists or filetype not allowed"));
    }
  },
}).single("file");
//*/
}
