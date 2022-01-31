import express from 'express';
import bcrypt from 'bcrypt';

//-------------importing models----------------//
import Member from '../models/member.js';
import Role from '../models/role.js';

//-------------------Router---------------------------------//
const router = express.Router();

//----------------register member------------------------//
router.post('/register', async (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    e_mail,
    phone,
    address,
    membershipType,
  } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 6) {
      throw { message: 'Password must be at least 6 characters long' };
    }
    const defaultRole = await Role.findOne({ description: 'member' });
    const newMember = await new Member({
      username,
      password: bcrypt.hashSync(password, salt),
      firstName,
      lastName,
      e_mail,
      phone,
      address,
      membershipType,
      role: defaultRole,
    }).save();

    res.status(201).json({
      response: {
        userId: newMember._id,
        username: newMember.username,
        accessToken: newMember.accessToken,
        firstName: newMember.firstName,
        status: newMember.status,
        role: newMember.role,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//-----------------get all members--------------------//

router.get('/members', async (req, res) => {
  try {
    const allMembers = await Member.find().exec();
    return allMembers
      ? res.json(allMembers)
      : res.json({ success: false, message: 'No users in the database' });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//--------------updating member's role-------------//

router.patch('/member/:memberId/role/:roleId', async (req, res) => {
  const { memberId, roleId } = req.params;

  try {
    const queriedMember = await Member.findById(memberId);

    if (queriedMember) {
      const queriedRole = await Role.findById(roleId);
      if (queriedRole) {
        const updateMember = await Member.findByIdAndUpdate(
          memberId,
          {
            $set: {
              role: queriedRole,
            },
          },
          { new: true }
        );
        res.status(201).json({ response: updateMember, success: true });
      } else {
        res.status(400).json({ response: 'role not found', success: false });
      }
    } else {
      res.status(400).json({ response: 'member not found', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

export default router;
