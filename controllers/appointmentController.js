import { sql } from '../config/db.js';

// GET all appointments for logged-in client
export const getClientAppointments = async (req, res) => {
  console.log('Fetching client appointments...');
  console.log('req.user:', req.user); // Debug log

  try {
    const userId = req.user?.id;
    if (!userId) {
      console.error('User ID not found in request');
      return res.status(400).json({ message: 'Invalid user data' });
    }

    const appointments = await sql`
      SELECT * FROM appointments WHERE client_id = ${userId} ORDER BY start_time DESC
    `;

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching client appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET appointment by ID
export const getAppointmentById = async (req, res) => {
  console.log('Fetching appointment by ID:', req.params.id);

  try {
    const appointmentId = req.params.id;

    const appointments = await sql`
      SELECT * FROM appointments WHERE id = ${appointmentId}
    `;

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointments[0]);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST create appointment
export const createAppointment = async (req, res) => {
  console.log('Creating appointment...');
  console.log('req.user:', req.user);
  console.log('req.body:', req.body);

  try {
    const userId = req.user?.id;
    let { stylist_id, appointment_date, service_id, notes, start_time } = req.body;

    // Check if required fields are present and not empty
    if (
      !stylist_id || stylist_id === '' ||
      !service_id || service_id === '' ||
      !start_time || start_time === ''
    ) {
      return res.status(400).json({ message: 'Please complete all fields before submitting.' });
    }

    // Validate stylist_id and service_id as integers
    if (isNaN(parseInt(stylist_id)) || isNaN(parseInt(service_id))) {
      return res.status(400).json({ message: 'Please complete all fields before submitting.' });
    }

    stylist_id = parseInt(stylist_id);
    service_id = parseInt(service_id);

    // Insert the appointment
    const insertedAppointments = await sql`
      INSERT INTO appointments (
        client_id,
        stylist_id,
        service_id,
        notes,
        start_time
      ) VALUES (
        ${userId},
        ${stylist_id},
        ${service_id},
        ${notes || ''},
        ${start_time}
      )
      RETURNING *
    `;

    res.status(201).json(insertedAppointments[0]);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// PUT update appointment
export const updateAppointment = async (req, res) => {
  console.log('Updating appointment ID:', req.params.id);
  console.log('req.body:', req.body);

  try {
    const appointmentId = req.params.id;
    const { appointment_date, notes } = req.body;

    const updatedAppointments = await sql`
      UPDATE appointments
      SET appointment_date = ${appointment_date}, notes = ${notes}
      WHERE id = ${appointmentId}
      RETURNING *
    `;

    if (updatedAppointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(updatedAppointments[0]);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE appointment
export const deleteAppointment = async (req, res) => {
  console.log('Deleting appointment ID:', req.params.id);

  try {
    const appointmentId = req.params.id;

    const deletedAppointments = await sql`
      DELETE FROM appointments WHERE id = ${appointmentId} RETURNING *
    `;

    if (deletedAppointments.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// GET all appointments for a stylist by user_id

export const getStylistAppointments = async (req, res) => {
  console.log('Fetching appointments for stylist user_id:', req.params.userId);

  try {
    const userId = req.params.userId;

    // Get stylist.id from user_id
    const stylist = await sql`
      SELECT id FROM stylists WHERE user_id = ${userId}
    `;

    if (stylist.length === 0) {
      return res.status(404).json({ message: 'Stylist not found' });
    }

    const stylistId = stylist[0].id;

    // Get all appointments with service name for that stylist
    const appointments = await sql`
      SELECT a.*, s.name AS service_name
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      WHERE a.stylist_id = ${stylistId}
      ORDER BY a.start_time DESC
    `;

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching stylist appointments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

