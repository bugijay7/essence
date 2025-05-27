import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate JWT token with id, role, isAdmin
export const generateToken = (user) => {
  return jwt.sign(
    { id: String(user.id), role: user.role, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Middleware to verify the token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expecting: Bearer <token>

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    // Normalize ID to string for consistency
    req.user = {
      ...user,
      id: String(user.id),
    };
    next();
  });
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

// Middleware to check if user is a stylist
export const isStylist = (req, res, next) => {
  if (req.user.role !== 'stylist') {
    return res.status(403).json({ message: 'Access denied: Stylists only' });
  }
  next();
};

// Middleware to check if user is the same as the one accessing the data OR an admin
export const isSelfOrAdmin = (req, res, next) => {
  // Normalize params.id to string for consistent comparison
  if (req.user.role === 'admin' || req.user.id === String(req.params.id)) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied' });
};
