const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for the data
const SignalSchema = new Schema({
});

// Create model for the data
const Signals = mongoose.model('signals', SignalSchema);

module.exports = Signals;
