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
  Main.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/trials/:experiment_number', (req, res, next) => {
    console.log("exp_no " + req.params.experiment_number)
    var experiment8 = "5432bcb136ac55e198b91777"
    var experiment9 = "5432bd0136ac55e198b91778"
    var selected_experiment = experiment9 //default
    if(req.params.experiment_number == undefined){
        selected_experiment = experiment9
    }
    if(req.params.experiment_number == "8"){
        selected_experiment = experiment8
    }
  Trials.find({experiment:mongoose.Types.ObjectId(selected_experiment)})
    .select('answers media')
    .then((data) => res.json(data))
    .catch(next);
});
router.get('/songname/:label', (req, res, next) => {
  var extractLabel = req.params.label
  .match(/(?:"[^"]*"|^[^"]*$)/)[0]
  .replace(/"/g, "");
  Main.find({label: extractLabel})
    .select('title')
    .select('artist')
    .then((data) => res.json(data))
    .catch(next);
});
router.get('/signalData/:Id', (req, res, next) => {
  var extractId = req.params.Id
  .match(/(?:"[^"]*"|^[^"]*$)/)[0]
  .replace(/"/g, "");
  Signals.find({trial:mongoose.Types.ObjectId(extractId)})
    .select('_id')
    .select('label')
    .select('derived_eda_data_file')
    .select('derived_pox_data_file')
    .then((data) => res.json(data))
    .catch(next);
});

router.get('/signals/:filename', (req, res, next) => {
  let gfs;
  
  var extractId = req.params.filename
  .match(/(?:"[^"]*"|^[^"]*$)/)[0] 
  .replace(/"/g, ""); 
  
  var file_user_id = extractId + ".csv";
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('signals');

  gfs.files.find({_id:mongoose.Types.ObjectId(extractId)}).toArray((err,file) =>{

  if (err) {
            console.log(err);
        } 
        else {
            // detect the content type and set the appropriate response headers.
            let mimeType = file.contentType;
            //console.log("mimeType " + mimeType);
            if (!mimeType) {
                mimeType = mime.getType(file[0].filename);
            }
            //console.log("mimeType 2" + mimeType);
 
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

router.get('/song/:song1label', (req, res, next) => {
  let gfs, gridFSBucket;
  
  var extractLabel = req.params.song1label
  .match(/(?:"[^"]*"|^[^"]*$)/)[0]
  .replace(/"/g, ""); 
  
  var songFileName = extractLabel + ".wav";
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('media');

  gfs.files.find({filename:songFileName}).toArray((err,file) =>{

  if (err) {
            console.log(err);
        } 
        else {
            // detect the content type and set the appropriate response headers.
            let mimeType = file.contentType;
            //console.log("mimeType " + mimeType);
            if (!mimeType) {
                mimeType = mime.getType(file[0].filename);
            }
            //console.log("mimeType 2" + mimeType);

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

router.get('/mediasong', (req, res, next) => {
  let gfs, gridFSBucket;
  

  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('media');

  gfs.collection('media').find({_id:mongoose.Types.ObjectId("537e601bdf872bb71e4df26a")}).toArray((err,file) =>{

  if (err) {
            console.log(err);
        } 
        else {
            // detect the content type and set the appropriate response headers.
            let mimeType = file.contentType;
            //console.log("mimeType " + mimeType);
            if (!mimeType) {
                mimeType = mime.getType(file[0].filename);
            }
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
