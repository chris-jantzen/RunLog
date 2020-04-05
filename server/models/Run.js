const { Schema, model } = require('mongoose');

const runSchema = new Schema(
  {
    distance: {
      type: Number,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    location: String,
    timeOfDay: String,
    // F.K.'s
    shoeId: String,
    userId: {
      type: String,
      required: true
    }
  },
  {
    collection: 'runs'
  }
);

module.exports = model('Run', runSchema);
