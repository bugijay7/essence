import bcrypt from 'bcryptjs';
import { sql } from '../config/db.js';
import jwt from 'jsonwebtoken';

// Register User Handler
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Determine role based on email domain
    let roleName = 'client'; // default

    if (email.endsWith('@adminearth.com')) {
      roleName = 'admin';
    } else if (email.endsWith('@earth.com')) {
      roleName = 'stylist';
    }

    // Fetch role_id from roles table
    const roleQuery = await sql`SELECT id FROM roles WHERE name = ${roleName}`;
    const roleId = roleQuery[0]?.id;

    if (!roleId) {
      return res.status(500).json({ message: `Role '${roleName}' not found in database` });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user with role_id
    const newUser = await sql`
      INSERT INTO users (username, email, password, role_id)
      VALUES (${username}, ${email}, ${hashedPassword}, ${roleId})
      RETURNING id, username, email
    `;

    res.status(201).json({ message: 'User created successfully', user: newUser[0] });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Login User Handler
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

   const userResult = await sql`
  SELECT u.id, u.username, u.email, u.password, r.name as role
  FROM users u
  JOIN roles r ON u.role_id = r.id
  WHERE u.email = ${email}
`;
const user = userResult[0];


    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Make sure your user table has a 'role' column
    const role = user.role || 'client'; // default to client if no role in DB

    const token = jwt.sign(
      { id: user.id, email: user.email, role },  // include role in token payload
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role,  // include role in response
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Logout User Handler (optional, depending on your auth strategy)
export const logoutUser = (req, res) => {
  // Since JWT is stateless, logout can be handled client-side by deleting the token.
  // You can also implement token blacklisting here if desired.
  res.status(200).json({ message: 'Logout successful' });
};
