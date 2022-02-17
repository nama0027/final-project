import express from 'express';
import cloudinaryFramework from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

//-------------importing models----------------//
import UploadFile from '../models/file.js';

//---------------importing middleware--------------------------//
import authenticateUser from '../utils/authenticate.js';
import authenticateRole from '../utils/authRole.js';

//-------------------Router---------------------------------//
const router = express.Router();

//-------------------------setting up dotenv-------------------//
dotenv.config();

//------------------------------------------------------------//

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // this needs to be whatever you get from cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//---------------------------for file upload------------------//
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'files',
    allowedFormats: ['jpeg', 'jpg', 'png', 'pdf'],
  },
});
const parser = multer({ storage: storage });

//---------------------------for avatar upload------------------//
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar',
    allowedFormats: ['jpeg', 'jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});
const avatarParser = multer({ storage: avatarStorage });

//-------------------upload file---------------------------------//

router.post(
  '/upload/file',
  authenticateUser,
  authenticateRole,
  parser.single('fileName'),
  async (req, res) => {
    try {
      const newFile = await new UploadFile({
        filePath: req.file.path,
        public_id: req.file.filename,
      }).save();
      res.status(201).json({ response: newFile, success: true });
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);

//-------------------upload avatar---------------------------------//

router.post(
  '/upload/avatar',

  avatarParser.single('fileName'),
  async (req, res) => {
    try {
      const newFile = await new UploadFile({
        filePath: req.file.path,
        public_id: req.file.filename,
      }).save();
      res.status(201).json({ response: newFile, success: true });
    } catch (error) {
      res.status(400).json({ response: error, success: false });
    }
  }
);

//---------------------------------------------------//

export default router;
