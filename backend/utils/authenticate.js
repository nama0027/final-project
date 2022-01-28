import Member from '../models/member.js';

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    const user = await Member.findOne({ accessToken }).populate('role', {
      description: 1,
      _id: 0,
    });
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(401).json({ response: 'Please, log in', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export default authenticateUser;
