const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    fname: {
      type: String,
      required: true
    },
    lname: String,
    age: Number,
    height: Number,
    weight: Number,
    measurementSystem: {
      type: String,
      required: true
    },
    // F.K.'s
    shoes: String,
    runs: String,
    parentId: String
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
