import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import Product from './models/Product.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Beauty E-Commerce API is running...');
});

// Auto-seed sample products if database is empty
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('No products found. Seeding sample beauty products...');
      const sampleProducts = [
        {
          name: 'Rose Dew Hydrating Face Serum',
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
          description: 'A luxurious lightweight face serum infused with pure Bulgarian Rose Damascena Water and Hyaluronic Acid to intensely hydrate, plump, and restore natural glow to your skin.',
          brand: 'AURA',
          category: 'Skincare',
          price: 36.00,
          countInStock: 25,
          rating: 4.8,
          numReviews: 48,
        },
        {
          name: 'Velvet Matte Liquid Lipstick',
          image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
          description: 'A highly pigmented matte liquid lipstick that glides on smoothly, delivering intense color payoff that lasts up to 16 hours. Enriched with Vitamin E and Avocado Oil for comfortable, non-drying wear.',
          brand: 'AURA',
          category: 'Makeup',
          price: 22.00,
          countInStock: 40,
          rating: 4.6,
          numReviews: 32,
        },
        {
          name: 'Golden Hour Powder Highlighter',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
          description: 'Capture the magic of golden hour with this ultra-fine, buildable powder highlighter. Designed to reflect light beautifully for a radiant, luminous finish on all skin tones.',
          brand: 'AURA',
          category: 'Makeup',
          price: 28.00,
          countInStock: 15,
          rating: 4.9,
          numReviews: 19,
        },
        {
          name: 'Silk Essence Nourishing Hair Oil',
          image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
          description: 'Transform dry, frizzy hair with our lightweight nourishing hair oil. Crafted with pure Moroccan Argan Oil and Camellia extract to restore silkiness, strength, and ultimate shine.',
          brand: 'AURA',
          category: 'Haircare',
          price: 42.00,
          countInStock: 20,
          rating: 4.7,
          numReviews: 29,
        },
        {
          name: 'Coconut Body Glow Butter',
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
          description: 'Indulge your body in this rich, whipped body butter infused with raw coconut oil and organic shea butter. Melts into skin effortlessly, providing 24-hour hydration and a beautiful shimmer.',
          brand: 'AURA',
          category: 'Skincare',
          price: 30.00,
          countInStock: 18,
          rating: 4.5,
          numReviews: 14,
        },
        {
          name: 'Jasmine Mist Soothing Toner',
          image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
          description: 'A refreshing botanical face mist to balance, calm, and hydrate skin. Spritz throughout the day for an instant boost of freshness and a delicate scent of sweet Jasmine petals.',
          brand: 'AURA',
          category: 'Skincare',
          price: 18.00,
          countInStock: 30,
          rating: 4.4,
          numReviews: 22,
        },
      ];

      await Product.insertMany(sampleProducts);
      console.log('Sample products seeded successfully!');
    }
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await seedProducts();
});
