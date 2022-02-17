import cloudinaryFramework from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

//-------------------------setting up dotenv-------------------//
dotenv.config();

//------------------------------------------------------------//

export const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // this needs to be whatever you get from cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//---------------------------for avatar upload------------------//
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar',
    allowedFormats: ['jpeg', 'jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});
export const avatarParser = multer({ storage: avatarStorage });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'files',
    allowedFormats: ['jpeg', 'jpg', 'png', 'pdf'],
  },
});
export const parser = multer({ storage: storage });
