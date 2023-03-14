const { Schema, model } = require('mongoose');
const status = ['successful', 'pending', 'failed'];

const TransactionSchema = new Schema({
  TransactionType: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending',
  },
});
