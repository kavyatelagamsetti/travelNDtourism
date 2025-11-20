const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://admin:rvCCS1qdZeQd2PuR@cluster0.jegr4gf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/booking', require('./routes/booking'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await require('./models/Admin').findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      const Admin = require('./models/Admin');
      const admin = new Admin({
        email: 'admin@example.com',
        password: 'admin123'
      });
      await admin.save();
      console.log('Default admin created: admin@example.com / admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

const startServer = async () => {
  await connectDB();
  await createDefaultAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();