import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userRes = await axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = userRes.data.user || userRes.data;
        setUser(userData);

        const [servicesRes, stylistsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/services', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3000/api/stylists', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setServices(servicesRes.data.services || servicesRes.data);
        setStylists(stylistsRes.data.stylists || stylistsRes.data);

        const apptRes = await axios.get(
          'http://localhost:3000/api/appointments/client',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAppointments(apptRes.data.appointments || apptRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const getServiceName = (id) => {
    return services.find((s) => s.id === id)?.name || 'Unknown Service';
  };

  const getStylistName = (id) => {
    return stylists.find((s) => s.id === id)?.name || 'Unknown Stylist';
  };

  const handleBookClick = () => {
    navigate('/book');
  };

  if (loading)
    return (
      <p className="text-center mt-12 text-lg text-gray-500 font-medium">
        Loading dashboard...
      </p>
    );

  return (
    <div className="max-w-5xl px-4 py-6 font-sans w-full">
  <h1 className="text-4xl font-extrabold text-pink-600 mb-6 text-left">
    Hello, {user?.username || 'Guest'} 💕
  </h1>

  <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <h2 className="text-2xl font-semibold text-gray-700 text-left">
      Your Dashboard
    </h2>
    <button
      onClick={handleBookClick}
      className="bg-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-pink-600 transition duration-200"
    >
      + Book Appointment
    </button>
  </div>

  {/* Upcoming Appointments */}
  <section className="mb-10">
    <h3 className="text-xl font-bold text-pink-500 mb-4 text-left">
      📅 Upcoming Appointments
    </h3>
    {appointments.filter((appt) => new Date(appt.start_time) > new Date()).length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments
          .filter((appt) => new Date(appt.start_time) > new Date())
          .map((appt) => (
            <div
              key={appt.id}
              className="bg-white rounded-lg shadow border border-pink-100 p-4 hover:shadow-md transition"
            >
              <p className="font-bold text-gray-700 mb-1">
                <span className="font-semibold text-pink-600">Service:</span> {getServiceName(appt.service_id)}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-pink-600">Stylist:</span> {getStylistName(appt.stylist_id)}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-pink-600">Time:</span>{' '}
                {new Date(appt.start_time).toLocaleString()}
              </p>
              <span className="inline-block mt-2 text-sm px-3 py-1 bg-pink-100 text-pink-600 rounded-full">
                {appt.status}
              </span>
            </div>
          ))}
      </div>
    ) : (
      <p className="text-gray-500 italic text-left">No upcoming appointments found.</p>
    )}
  </section>

  {/* Past Appointments */}
  <section>
    <h3 className="text-xl font-bold text-pink-500 mb-4 text-left">
      🕓 Past Appointments
    </h3>
    {appointments.filter((appt) => new Date(appt.start_time) <= new Date()).length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments
          .filter((appt) => new Date(appt.start_time) <= new Date())
          .map((appt) => (
            <div
              key={appt.id}
              className="bg-gray-50 rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition"
            >
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-pink-600">Service:</span> {getServiceName(appt.service_id)}
              </p>
              <p className="text-zinc-950 mb-1">
                <span className="font-semibold text-pink-600">Stylist:</span> {getStylistName(appt.stylist_id)}
              </p>
              <p className="font-bold text-gray-700 mb-1">
                <span className="font-semibold text-pink-600">Time:</span>{' '}
                {new Date(appt.start_time).toLocaleString()}
              </p>
              <span className="inline-block mt-2 text-sm px-3 py-1 bg-gray-200 text-gray-600 rounded-full">
                {appt.status}
              </span>
            </div>
          ))}
      </div>
    ) : (
      <p className="text-gray-500 italic text-left">No past appointments yet.</p>
    )}
  </section>
</div>

  );
}

export default ClientDashboard;
