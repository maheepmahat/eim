const express = require('express');
const router = express.Router();
const Main = require('../models/main');

router.get('/main', (req, res, next) => {
  // This will return  the data
  Main.find({})
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
