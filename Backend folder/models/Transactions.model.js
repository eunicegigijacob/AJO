const { Schema, model } = require('mongoose');
const status = ['successful', 'pending', 'failed'];

const TransactionSchema = new Schema({
  TransactionType: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  Status: {
    type: String,
    enum: ['processing', 'successful', 'failed'],
    default: 'processing',
  },
  Sender: {
    name: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    bankName: { type: String },
  },
  recipient: {
    type: Number,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
});
