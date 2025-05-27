import { sql } from '../config/db.js';

// Get all services
// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await sql`
      SELECT 
        services.*, 
        users.username AS stylist_name
      FROM services
      LEFT JOIN stylists ON services.stylist_id = stylists.id
      LEFT JOIN users ON stylists.user_id = users.id
      ORDER BY services.id;
    `;

    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const services = await sql`SELECT * FROM services WHERE id = ${id}`;
    if (services.length === 0) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(services[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new service
export const createService = async (req, res) => {
  try {
    const { name, description, duration, price, image, stylist_id } = req.body;
    const [newService] = await sql`
      INSERT INTO services (name, description, duration, price, image)
      VALUES (${name}, ${description}, ${duration}, ${price}, ${image}, ${stylist_id})
      RETURNING *`;
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration, price, image } = req.body;

    const [updatedService] = await sql`
      UPDATE services
      SET name = ${name}, description = ${description}, duration = ${duration}, price = ${price}, image = ${image}
      WHERE id = ${id}
      RETURNING *`;

    if (!updatedService) return res.status(404).json({ message: 'Service not found' });

    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedService] = await sql`
      DELETE FROM services
      WHERE id = ${id}
      RETURNING *`;

    if (!deletedService) return res.status(404).json({ message: 'Service not found' });

    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





export const getServicesWithStylists = async (req, res) => {
  try {
    const services = await sql`
      SELECT 
        services.id AS service_id,
        services.name AS service_name,
        services.description,
        services.duration,
        services.price,
        services.image,
        stylists.id AS stylist_id,
        stylists.bio,
        stylists.specialties,
        stylists.profile_pic,
        users.id AS user_id,
        users.name AS stylist_name
      FROM services
      JOIN stylists ON services.stylist_id = stylists.id
      JOIN users ON stylists.user_id = users.id
      ORDER BY services.id DESC;
    `;

    res.json(services);
  } catch (error) {
    console.error('Error fetching services with stylists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
