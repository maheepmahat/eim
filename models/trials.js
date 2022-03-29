const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for the data

/*const MetadataSchema = new Schema({
    terminal = Number,
    location = String,
    session_number = Number
});
*/
/*const MusicStylesSchema = new Schema({
    
});
const AnswersSchema = new Schema({
    music_styles = {type: String},
    most_engaged = Number,
    most_enjoyed = Number,
    emotion_indices = String,
    sex = String,
    dob = Date,
    musical_background = Boolean,
    rating = String,
    nationality = String,
    visual_impairments = Boolean,
    musical_expertise = Number,
    hairing_impairments = Boolean,
    age = moongose.Types.Decimal128
});*/

const opts = { toJSON: { virtuals: true } };
const TrialsSchema = new Schema({
    /*metadata : {type: String},
    answers : {type: String},
    timestamps : {type: String},
    media : {type: String},
    date : {type: Date},
    valid : {type: Boolean},
    random : {type: mongoose.Types.Decimal128},
    experiment : {type: mongoose.ObjectId},
    signals : {type: String}*/
}, opts);

// Create model for the data
const Trials = mongoose.model('trials', TrialsSchema);

module.exports = Trials;
