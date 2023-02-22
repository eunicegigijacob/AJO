const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const CustomerSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter firstname'],
  },
  lastname: {
    type: String,
    required: [true, 'Please enter lastname'],
  },
  email: {
    type: String,
    required: [true, 'Please enter email address'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email address '],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please enter phoneNumber'],
    unique: true,
  },
  InviteCode: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
  },
});

CustomerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

CustomerSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};

const Customer = model('Customer', CustomerSchema);

module.exports = { Customer };
