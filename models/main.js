const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for the data
const MediaSchema = new Schema({
    title: {type: String},
    title : {type: String},
    label : {type: String},
    has_lyrics : {type: Boolean},
    comments : {type: String},
    year : {type: Date},
    excerpt_start_time : {type: Date},
    excerpt_end_time : {type: Date},
    bpm : {type: mongoose.Types.Decimal128},
    source : {type: String},
    key : {type: String}
});

// Create model for the data
const Main = mongoose.model('media', MediaSchema);

module.exports = Main;
