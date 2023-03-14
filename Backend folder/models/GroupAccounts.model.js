const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const MemberSchema = new Schema({
  Id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter email address'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email address '],
  },
  Acesskey: {
    type: String,
  },
});

const GroupAccountSchema = new Schema(
  {
    AccountName: {
      type: String,
      required: [true, 'Please enter an account name'],
    },
    Members: {
      type: [MemberSchema],
      required: [true, 'Please state the group memebers'],
    },
    IsPublic: {
      type: Boolean,
      default: false,
    },
    Target: {
      type: Number,
    },
    Balance: {
      type: Number,
      default: 0.0,
    },
  },
  { timeStamps: true }
);

const GroupAccount = model('GroupAccount', GroupAccountSchema);

module.exports = { GroupAccount };
