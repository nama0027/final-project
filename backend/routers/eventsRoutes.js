import express from 'express';
import Event from '../models/events.js';

//-------------importing models----------------//
import Events from '../models/events.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//--------------------------Routes----------------------------------//

//--------------------Create event---------------------//
router.post('/events', authenticateUser, authenticateRole, async (req, res) => {
  const { eventTitle, eventType, eventDate, eventTime, eventVenue } = req.body;
  try {
    if (eventTitle.length < 5 && eventTitle.length > 100) {
      throw { message: 'Event title should be between 5 to 100 characters.' };
    }

    const newEvent = await new Events({
      eventTitle,
      eventType,
      eventDate,
      eventTime,
      eventVenue,
    }).save();

    res.status(201).json({ response: newEvent, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//----------------------get events---------------------//

router.get('/events', authenticateUser, async (req, res) => {
  try {
    const allEvents = await Events.find().exec();
    if (allEvents) {
      res.status(200).json({ response: allEvents, success: true });
    } else {
      res.json({ success: false, message: 'No events available' });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

//---------------------------//
export default router;
