import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import forum from './routers/forum.js';
import membersRoute from './routers/membersRoutes.js';
import announcementRoutes from './routers/announcementRoutes.js';
import boardRoutes from './routers/boardRoutes.js';
import messageRoutes from './routers/messageRoutes.js';
import roleRoutes from './routers/roleRoutes.js';
import eventsRoutes from './routers/eventsRoutes.js';

//---------------------database ---------------------------//

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/PKFU';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.use('/', forum);
app.use('/', membersRoute);
app.use('/', announcementRoutes);
app.use('/', boardRoutes);
app.use('/', messageRoutes);
app.use('/', roleRoutes);
app.use('/', eventsRoutes);

// ----------Start the server--------------------//
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
