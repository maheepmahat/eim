const express = require('express');
const router = express.Router();
const Main = require('../models/main');
const Trials = require('../models/trials')
const Media = require('../models/media')
const Signals = require('../models/signal')
const Signalsfiles = require('../models/signalsfiles')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mime = require('mime');

let db = mongoose.connection;

router.get('/main', (req, res, next) => {
  // This will return  the data
  Main.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/trials', (req, res, next) => {
  // This will return  the data
  Trials.find({})
    .select('answers media')
    // .select('-answers.ratings')
    .limit(100)
    .then((data) => res.json(data))
    .catch(next);
});
router.get('/signalData', (req, res, next) => {
  // This will return  the data
  Signals.find({})
    .select('answers media')
    // .select('-answers.ratings')
    .limit(100)
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/signals/:Id', (req, res, next) => {
  let gfs, gridFSBucket;
  
  console.log("id received is = " + req.params.Id);
  var user_id = req.params.Id + ".csv";
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('signals');
  console.log("user_id var = " + user_id + "type = " + typeof(user_id));

  // gfs.files.find({_id:mongoose.Types.ObjectId(user_id)},{ metadata:{location:"bergen"} }).toArray((err,file) =>{
     gfs.files.find({filename:"5410edbd08ad6ee3090e20c6.csv"},{ metadata:{location:"bergen"} }).toArray((err,file) =>{

  if (err) {
            // report the error
            console.log(err);
        } 
        else {
          console.log("file length " + file.length);
          console.log("file =" + file);
            // detect the content type and set the appropriate response headers.
            let mimeType = file.contentType;
            console.log("mimeType " + mimeType);
            if (!mimeType) {
                mimeType = mime.getType(file[0].filename);
            }
            console.log("mimeType 2" + mimeType);

            /* file[0].set({
                'Content-Type': mimeType,
                'Content-Disposition': 'attachment; filename=' + file[0].filename
            }); */

            const readStream = gfs.createReadStream({_id:file[0]._id})
            readStream.on('error', err => {
                // report stream error
                console.log(err);
            });
            // the response will be the file itself.
            readStream.pipe(res);
        }
      });

});

router.get('/song', (req, res, next) => {
  let gfs, gridFSBucket;
  

  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('media');

  gfs.files.find({_id:mongoose.Types.ObjectId("537e4b1e050992e6b6107bce")}).toArray((err,file) =>{

  if (err) {
            // report the error
            console.log(err);
        } 
        else {
          console.log("file length " + file.length);
          console.log("file =" + file);
            // detect the content type and set the appropriate response headers.
            let mimeType = file.contentType;
            console.log("mimeType " + mimeType);
            if (!mimeType) {
                mimeType = mime.getType(file[0].filename);
            }
            console.log("mimeType 2" + mimeType);

            res.set({
                'Content-Type': mimeType,
                'Content-Disposition': 'attachment; filename=' + file[0].filename
            });

            const readStream = gfs.createReadStream({_id:file[0]._id})
            readStream.on('error', err => {
                // report stream error
                console.log(err);
            });
            // the response will be the file itself.
            readStream.pipe(res);
        }
      });

});


module.exports = router;
