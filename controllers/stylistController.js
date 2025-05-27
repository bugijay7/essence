import { sql } from '../config/db.js';

// Get all stylists
export const getAllStylists = async (req, res) => {
  try {
    const stylists = await sql`
      SELECT s.*, u.username AS name
      FROM stylists s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.id
    `;
    res.status(200).json(stylists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get stylist by ID
export const getStylistById = async (req, res) => {
  try {
    const { userId } = req.params;
   const stylist = await sql`
  SELECT stylists.*, users.username 
  FROM stylists
  JOIN users ON stylists.user_id = users.id
  WHERE stylists.user_id = ${userId}
`;

    if (stylist.length === 0) {
      return res.status(404).json({ message: 'Stylist not found' });
    }
    res.status(200).json(stylist[0]);
  } catch (err) {
    console.error('Error fetching stylist by user ID:', err);
    res.status(500).json({ error: err.message });
  }
};


// Create new stylist
export const createStylist = async (req, res) => {
  try {
    const { user_id, bio, specialties, profile_pic } = req.body;

    const [newStylist] = await sql`
      INSERT INTO stylists (user_id, bio, specialties, profile_pic)
      VALUES (${user_id}, ${bio}, ${specialties}, ${profile_pic})
      RETURNING *`;

    res.status(201).json(newStylist);
  } catch (err) {
    if (err.code === '23505') { // Unique constraint violation on user_id
      return res.status(400).json({ error: 'A stylist already exists for this user_id' });
    }
    res.status(500).json({ error: err.message });
  }
};

// Update stylist
export const updateStylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, specialties, profile_pic } = req.body;

    const [updatedStylist] = await sql`
      UPDATE stylists
      SET bio = ${bio}, specialties = ${specialties}, profile_pic = ${profile_pic}
      WHERE id = ${id}
      RETURNING *`;

    if (!updatedStylist) return res.status(404).json({ message: 'Stylist not found' });

    res.status(200).json(updatedStylist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete stylist
export const deleteStylist = async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedStylist] = await sql`
      DELETE FROM stylists
      WHERE id = ${id}
      RETURNING *`;

    if (!deletedStylist) return res.status(404).json({ message: 'Stylist not found' });

    res.status(200).json({ message: 'Stylist deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
