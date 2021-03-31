import multer from 'multer';
import path from 'path';

// const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,

  uploadsFolder: path.resolve(__dirname, '..', '..', 'tmp'),

  multer: {
    storage: multer.diskStorage({
      destination: path.join(__dirname, '..', '..', 'tmp'),
      filename: (request, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;

        cb(null, filename);
      },
    }),
  },
};
