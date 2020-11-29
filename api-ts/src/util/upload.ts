import * as fs from 'fs';
import * as multer from "multer";
import * as path from "path";
import * as ShortId from 'shortid';

let _maxSize = 0;

const storage = multer.diskStorage({
  destination: function (req: any, _file, cb) {
    _maxSize = req.body.filesize && Number(req.body.filesize) ? req.body.filesize : 0;
    const fileLoc = req.body.filelocation ? req.body.filelocation : 'files';
    cb(null, path.join(__dirname, `../assets/${fileLoc}/`));
  },
  filename: function (_req, file, cb) {
    const fileArr = file.originalname.split('.');
    const newName = `${ShortId.generate()}.${fileArr[fileArr.length - 1]}`;
    cb(null, newName);
  }
});

const maxSize = (_maxfileSize: number) => !_maxfileSize || _maxfileSize === 0 ? 4 * 1000 * 1000 : _maxfileSize * 1000 * 1000; // 4MB

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize(_maxSize) }
});

const _singleUpload = upload.single('file');
const _multiUpload = upload.array('files', 50);

export const singleUpload = (req: any, res: any) => {
  return new Promise((resolve, reject) => {

    _singleUpload(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        return reject({ success: false, resp: err });
      }

      return resolve({ success: true, resp: req.file });
      // Everything went fine.
    });

  });

};

export const multiUpload = (req: any, res: any) => {
  return new Promise((resolve, reject) => {

    _multiUpload(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        return reject({ success: false, resp: err });
      }

      return resolve({ success: true, resp: req.files });
      // Everything went fine.
    });

  });

};

export const DeleteSingleFile = (file: string) => {

  return new Promise((res, rej) => {
    const filePath = path.join(__dirname, `../assets/${file}`);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return rej('file could not be deleted');
      }

      // file removed
      return res('file deleted');
    });
  });

};

export const DeleteMultipleFiles = (files: string[]) => {
  return new Promise((res, rej) => {
    deleteFiles(files, err => {
      if (err) {
        console.log(err);
        return rej(err);
      } else {
        console.log('all files removed');
        return res('all files removed');
      }
    });
  });

};


function deleteFiles(files: string[], callback) {
  let i = files.length;
  files.forEach(filepath => {
    const fullFilePath = path.join(__dirname, `../assets/${filepath}`);
    fs.unlink(fullFilePath, (err) => {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}


/*
NB: Example of how to call it....the formData order really matters. the file should be the last parameter
var fs = require("fs");
var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:3001/uploadfile',
  headers:
   { 'Postman-Token': '97c2f8f2-76a5-4294-8c5f-817019955f98',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData:
   { filesize: '4',
     filelocation: 'myLoc',
     file:
      { value: 'fs.createReadStream("C:\\Users\\ishmael.gyaban\\Desktop\\ISMAEL0001.pdf")',
        options:
         { filename: 'C:\\Users\\ishmael.gyaban\\Desktop\\ISMAEL0001.pdf',
           contentType: null } } } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


*/