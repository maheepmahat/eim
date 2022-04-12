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

router.get('/signals', (req, res, next) => {
  let gfs, gridFSBucket;
  

  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('signals');

  gfs.files.find({_id:mongoose.Types.ObjectId("56b90afc83a7352da11a3f33")},{ metadata:{location:"bergen"} }).toArray((err,file) =>{

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

/*router.get('/main', function(req, res){
  Main.find({})
    .exec(function(err,genres) {
      if(err) {
        res.send('error has occured');
      }
      else {
        res.json(genres);
      }
    });
  });*/

module.exports = router;
