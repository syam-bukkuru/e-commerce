const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
        quantity: { type: Number, default: 1 },
        size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
