const express = require('express');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    // check if product exists
    const product = await Item.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      // create new cart
      cart = new Cart({
        user: req.user.userId,
        items: [{ product: productId, quantity, size }]
      });
    } else {
      // check if item already exists in cart with same size
      const existingItem = cart.items.find(
        (i) => i.product.toString() === productId && i.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity; // increment quantity
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId })
      .populate('items.product', 'name price category size imageUrl');

    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:productId/:size', auth, async (req, res) => {
  try {
    const { productId, size } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (i) => !(i.product.toString() === productId && i.size === size)
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
