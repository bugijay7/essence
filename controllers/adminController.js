import { sql } from '../config/db.js';

export const getAdminSummary = async (req, res) => {
  try {
    const totalAppointments = await sql`SELECT COUNT(*) AS count FROM appointments`;
    const totalStylists = await sql`
      SELECT COUNT(*) AS count FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE r.name = 'stylist'
    `;
    const totalServices = await sql`SELECT COUNT(*) AS count FROM services`;

    const recentAppointments = await sql`
      SELECT a.id, a.start_time, a.status, u.username AS client_name, s.name AS service_name
      FROM appointments a
      JOIN users u ON a.client_id = u.id
      JOIN services s ON a.service_id = s.id
      ORDER BY a.start_time DESC
      LIMIT 5
    `;

 const stylistList = await sql`
  SELECT DISTINCT u.id, u.username, u.email
  FROM users u
  JOIN roles r ON u.role_id = r.id
  JOIN appointments a ON a.stylist_id = u.id
  WHERE r.name = 'stylist'
`;

    console.log('totalAppointments:', totalAppointments);
    console.log('totalStylists:', totalStylists);
    console.log('totalServices:', totalServices);
    console.log('recentAppointments:', recentAppointments);
    console.log('stylistList:', stylistList);

    res.json({
      appointments: totalAppointments[0].count,
      stylists: totalStylists[0].count,
      services: totalServices[0].count,
      recentAppointments,
      stylistList,
    });
  } catch (err) {
    console.error('Admin summary error:', err);
    res.status(500).json({ message: 'Failed to fetch admin summary' });
  }
};
