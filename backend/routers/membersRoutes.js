import express from 'express';
import bcrypt from 'bcrypt';
import { avatarParser } from '../utils/fileStorage.js';

//-------------importing models----------------//
import Member from '../models/member.js';
import Role from '../models/role.js';
import File from '../models/file.js';

//-------------------Router---------------------------------//
const router = express.Router();

//----------------register member------------------------//
router.post('/register', avatarParser.single('fileName'), async (req, res) => {
  const { values } = req.body;
  const dataObject = JSON.parse(values);
  const {
    username,
    password,
    firstName,
    lastName,
    e_mail,
    phone,
    address,
    membershipType,
  } = dataObject;

  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 6) {
      throw { message: 'Password must be at least 6 characters long' };
    }
    const defaultRole = await Role.findOne({ description: 'member' });

    if (req.file) {
      const newFile = await new File({
        filePath: req.file.path,
        public_id: req.file.filename,
      }).save();

      if (newFile) {
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
          avatar: newFile,
        }).save();
        res.status(201).json({
          response: newMember,
          success: true,
        });
      } else {
        res
          .status(404)
          .json({ response: 'avatar not uploaded', success: false });
      }
    } else {
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

      res.status(201).json({ response: newMember, success: true });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//-----------------get all members--------------------//

router.get('/members', async (req, res) => {
  try {
    const allMembers = await Member.find().exec();
    if (allMembers) {
      res.status(200).json({ response: allMembers, success: true });
    } else {
      res.json({ success: false, message: 'No member found' });
    }
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
