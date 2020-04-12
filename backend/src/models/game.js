const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    sessionID: { type: String, required: true },
    histories: [String],
    squares: [String],
    xIsNext: Boolean,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Game', gameSchema);
