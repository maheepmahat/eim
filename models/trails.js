const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for the data

const MetadataSchema = new Schema({
    terminal = Number,
    location = String,
    session_number = Number
});

const MusicStylesSchema = new Schema({
    
});
const AnswersSchema = new Schema({
    music_styles = MusicStylesSchema,
    most_engaged = Number,
    most_enjoyed = Number,
    emotion_indices = String,
    sex = String,
    dob = Date,
    musical_background = Boolean,
    rating = RatingSchema,
    nationality = String,
    visual_impairments = Boolean,
    musical_expertise = Number,
    hairing_impairments = Boolean,
    age = moongose.Types.Decimal128
});
const TrialsSchema = new Schema({
    metadata = MetadataSchema,
    answers = AnswersSchema,
    timestamps = TimestampsSchema,
    media = MediaSchema,
    date = Date,
    valid = Boolean,
    random = mongoose.Types.Decimal128,
    experiment = moongose.ObjectId,
    signals = SignalsSchema
});

// Create model for the data
const Trials = mongoose.model('media', TrialsSchema);

module.exports = Trials;
