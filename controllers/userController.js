import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql } from "../config/db.js"

// Temporary in-memory user store
const users = [];

const generateToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'your_jwt_secret', {
    expiresIn: '1d',
  });
};

// @desc Get all users
export const getAllUsers = (req, res) => {
  res.json(users);
};

// @desc Get user by ID
export const getUserById = (req, res) => {
  const userId = req.params.id.toString();
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// @desc Create a new user
export const createUser = (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password: hashedPassword,
    isAdmin: false,
  };

  users.push(newUser);
  const token = generateToken(newUser);

  res.status(201).json({ ...newUser, token });
};

// @desc Get current logged-in user

export const getMe = async (req, res) => {
  const userId = req.user.id;

  try {
    const users = await sql`
      SELECT u.id, u.username, u.email, r.name AS role
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ${userId}
    `;

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    res.json(user);

  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// @desc Update user
export const updateUser = (req, res) => {
  const userId = req.params.id.toString();
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { username, email, isAdmin } = req.body;

  if (userame) user.username = username;
  if (email) user.email = email;
  if (isAdmin !== undefined) user.isAdmin = isAdmin;

  res.json(user);
};

// @desc Delete user
export const deleteUser = (req, res) => {
  const userId = req.params.id.toString();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1);
  res.json({ message: 'User deleted successfully' });
};
