const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for the data
const MediaSchema = new Schema({
});

// Create model for the data
const Media = mongoose.model('media.files', MediaSchema);

module.exports = Media;
