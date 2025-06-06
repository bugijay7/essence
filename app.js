import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sql } from './config/db.js'


import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoute.js';
import stylistRoutes from './routes/stylistRoute.js';
import appointmentRoute from './routes/appointmentRoute.js'
import adminRoutes from './routes/adminRoute.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://essence-rosy.vercel.app',
  credentials: true
}));

app.use(express.json());





app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/stylists', stylistRoutes )
app.use('/api/appointments', appointmentRoute);
app.use('/api/admin', adminRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
