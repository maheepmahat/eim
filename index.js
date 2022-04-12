const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const Grid = require('gridfs-stream');
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);
const mime = require('mime');

require('dotenv').config();

const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;
let conn = mongoose.connection;
let db = mongoose.connection;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//------
//app.get('/download', function(req, res){
/*
let id = "5410edbb08ad6ee3090e20be";


gfs = Grid(db, mongoose.mongo);
gfs.collection('signals');

gfs.files.find({}, (err,file) =>{

  if (err) {
            // report the error
            console.log(err);
        } 
        else {
          console.log("file length " + file.length);
          console.log("id " + mongoose.Types.ObjectId(id));
          console.log("file =" + file);
          console.log("connection " + conn);
            // detect the content type and set the appropriate response headers.
            let mimeType = file.contentType;
            console.log("mimeType " + mimeType);
            if (!mimeType) {
                mimeType = mime.getType(file.filename);
            }
            console.log("mimeType 2" + mimeType);

            file.set({
                'Content-Type': mimeType,
                'Content-Disposition': 'attachment; filename=' + file.filename
            });

            const readStream = gfs.createReadStream({
                _id: id
            });
            readStream.on('error', err => {
                // report stream error
                console.log(err);
            });
            // the response will be the file itself.
            readStream.pipe(file);
        }
      });
      */
//});    
//------   

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
