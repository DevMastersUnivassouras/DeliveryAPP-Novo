// src/models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  payment: {
    method: String,
    transactionId: String,
    status: String,
    amount: Number
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: Object
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);