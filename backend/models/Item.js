const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         
    price: { type: Number, required: true },         
    category: {                                      
      type: String,
      enum: ['Men', 'Women', 'Kids'],
      required: true
    },
    size: {                                          
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL'],
      required: true
    },
    description: { type: String },
    imageUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
