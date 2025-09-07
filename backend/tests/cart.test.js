const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Item = require('../models/Item');
const Cart = require('../models/Cart');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let token, productId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Item.deleteMany({});
  await Cart.deleteMany({});

  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await User.create({
    name: 'Cart Tester',
    email: 'cart@example.com',
    password: hashedPassword
  });

  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const item = await Item.create({
    name: 'Blue Party Dress',
    price: 1500,
    category: 'Women',
    size: 'M',
    description: 'Perfect for evening events'
  });
  productId = item._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Cart API', () => {
  it('should add item to cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 1, size: 'M' });
    expect(res.statusCode).toBe(200);
    expect(res.body.items[0].product.toString()).toBe(productId.toString());
  });

  it('should fetch cart', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it('should remove item from cart', async () => {
    const res = await request(app)
      .delete(`/api/cart/${productId}/M`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(0);
  });
});
