import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StylishDashboard() {
  const { id: stylistId } = useParams();
  const [stylist, setStylist] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!stylistId) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [stylistRes, apptRes] = await Promise.all([
          axios.get(`https://essence-b1fv.onrender.com/api/stylists/user/${stylistId}`),
          axios.get(`https://essence-b1fv.onrender.com/api/appointments/stylist/${stylistId}`)
        ]);

        if (isMounted) {
          setStylist(stylistRes.data);
          setAppointments(apptRes.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [stylistId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading stylist data...</div>;
  }

  if (!stylist) {
    return <div className="text-center mt-10 text-red-500">Stylist not found.</div>;
  }

  const profilePicUrl = stylist.profile_pic
    ? `/assets/stylists/${stylist.profile_pic}`
    : '/images/default-profile.png';

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 flex flex-col lg:flex-row gap-6">
      {/* Stylist Card */}
      <div className="max-w-sm w-full border rounded-lg shadow-md overflow-hidden bg-white">
        <div className="w-full h-64 overflow-hidden">
          <img
            src={imgError ? '/images/default-profile.png' : profilePicUrl}
            alt={stylist.username}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 text-left">
          <h2 className="text-2xl font-semibold text-pink-600 mb-2">
            {stylist.username || `Stylist #${stylist.user_id || stylist.id}`}
          </h2>
          <p className="text-gray-700 mb-1">
            <strong>Specialties:</strong> {stylist.specialties || 'Not specified'}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {stylist.phone || 'Not available'}
          </p>
        </div>
      </div>

      {/* Appointments Schedule */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-pink-600 mb-4">Appointment Schedule</h3>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appt) => (
              <li
                key={appt.id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <p><strong>Client:</strong> {appt.client_name || 'Client'}</p>
                <p><strong>Service:</strong> {appt.service_name || 'N/A'}</p>
                <p><strong>Time:</strong> {new Date(appt.start_time).toLocaleString()}</p>
                <p><strong>Status:</strong> <span className="text-pink-600 font-medium">{appt.status}</span></p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
}

export default StylishDashboard;
