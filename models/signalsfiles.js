const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for the data
const SignalfilesSchema = new Schema({
});

// Create model for the data
const Signalsfiles = mongoose.model('signals.files', SignalfilesSchema);

module.exports = Signalsfiles;
