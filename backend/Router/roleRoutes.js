import express from 'express';

//-------------importing models----------------//
import Role from '../models/role.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

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
