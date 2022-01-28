import express from 'express';

//-------------importing models----------------//
import Board from '../models/board.js';
import Role from '../models/role.js';
import Member from '../models/member.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//--------------------Create board-----------------------------------------------//
router.post('/board', async (req, res) => {
  const { description } = req.body;
  try {
    const newBoardMember = await new Board({ description }).save();
    res.status(201).json({ response: newBoardMember, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/*/*****************adding reference to member********************** */
router.patch('/board/:boardId/member/:memberId', async (req, res) => {
  const { boardId, memberId } = req.params;

  try {
    const queriedBoard = await Board.findById(boardId);

    if (queriedBoard) {
      const queriedMember = await Member.findById(memberId);
      if (queriedMember) {
        const updateBoardMember = await Board.findByIdAndUpdate(
          boardId,
          {
            $push: {
              member: queriedMember,
            },
          },
          { new: true }
        );
        res.status(201).json({ response: updateBoardMember, success: true });
      } else {
        res.status(400).json({ response: 'member not found', success: false });
      }
    } else {
      res
        .status(400)
        .json({ response: 'board entry not found', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/*/*****************adding reference to role********************** */
router.patch('/board/:boardId/role/:roleId', async (req, res) => {
  const { boardId, roleId } = req.params;

  try {
    const queriedBoard = await Board.findById(boardId);

    if (queriedBoard) {
      const queriedRole = await Role.findById(roleId);
      if (queriedRole) {
        const updateBoardMember = await Board.findByIdAndUpdate(
          boardId,
          {
            $push: {
              role: queriedRole,
            },
          },
          { new: true }
        );
        res.status(201).json({ response: updateBoardMember, success: true });
      } else {
        res.status(400).json({ response: 'role not found', success: false });
      }
    } else {
      res
        .status(400)
        .json({ response: 'board entry not found', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/*/********************get board********************** */

router.get('/board', async (req, res) => {
  try {
    const allBoardMembers = await Board.find()
      .populate('member', {
        firstName: 1,
        lastName: 1,
        e_mail: 1,
        phone: 1,
        _id: 0,
      })
      .populate('role', { description: 1, _id: 0 });
    return allBoardMembers
      ? res.json(allBoardMembers)
      : res.json({
          success: false,
          message: 'No board members in the database',
        });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

export default router;
