const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
  
  const userSchema = new Schema({
    email: {
      type: String,
    },
    type: {
      type: String,
      enum: ['player', 'manager']
    },
    sport: {
        type: String
    },
    height: {
        type: Number
    },
    wieght: {
        typeof: Number
    },
    DOB: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    bodySize: {
        type: String,
        match: ['XS','S','M', 'L', 'XL']
    },
    footSize: {
        type: Number,
    }
  });
  
  // Compile the schema into a model and export it
  module.exports = mongoose.model('User', userSchema);