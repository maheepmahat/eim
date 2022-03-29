const express = require('express');
const router = express.Router();
const Main = require('../models/main');
const Trials = require('../models/trials')

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
    .select('-answers.ratings')
    .limit(110)
    .then((data) => res.json(data))
    .catch(next);
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
