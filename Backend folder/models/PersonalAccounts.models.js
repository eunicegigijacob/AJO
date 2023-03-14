const { Schema, model } = require('mongoose');

const PersonalAccountSchema = new Schema(
  {
    OwnerID: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please enter account owner'],
    },
    target: {
      type: Number,
    },
    Balance: {
      type: Number,
      default: 0.0,
    },
    MatureDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const PersonalAccount = model('PersonalAccount', PersonalAccountSchema);

module.exports = { PersonalAccount };
