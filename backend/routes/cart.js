const express = require('express');
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const auth = require('../middleware/auth');

const router = express.Router();

// helper: return populated cart
const getPopulatedCart = async (userId) => {
  return await Cart.findOne({ user: userId })
    .populate('items.product', 'name price category size imageUrl');
};

/**
 * Add item to cart
 */
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    const product = await Item.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        items: [{ product: productId, quantity, size }]
      });
    } else {
      const existingItem = cart.items.find(
        (i) => i.product.toString() === productId && i.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
    }

    await cart.save();
    const populatedCart = await getPopulatedCart(req.user.userId);
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Get cart for logged-in user
 */
router.get('/', auth, async (req, res) => {
  try {
    const cart = await getPopulatedCart(req.user.userId);
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Update quantity
 */
router.put('/:productId/:size', auth, async (req, res) => {
  try {
    const { productId, size } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) return res.status(400).json({ message: 'Quantity must be at least 1' });

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await getPopulatedCart(req.user.userId);
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Remove item
 */
router.delete('/:productId/:size', auth, async (req, res) => {
  try {
    const { productId, size } = req.params;

    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (i) => !(i.product.toString() === productId && i.size === size)
    );
    await cart.save();

    const populatedCart = await getPopulatedCart(req.user.userId);
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
