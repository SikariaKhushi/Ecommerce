// createAdmin.js
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: '12345',
    isAdmin: true
  });

  console.log('Admin created:', admin);
  mongoose.disconnect();
};

createAdmin();
