import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('https://essence-b1fv.onrender.com/api/admin/summary');
        setSummary(response.data);
      } catch (err) {
        setError('Failed to load admin summary.');
        console.error('Error fetching admin summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading admin dashboard...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-sans w-full">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-8 text-left">
        Welcome, Admin 🎯
      </h1>

      {/* Section: Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Appointments" value={summary.appointments} />
          <StatCard label="Stylists" value={summary.stylists} />
          <StatCard label="Services" value={summary.services} />
        </div>
      </section>

      {/* Section: Recent Appointments */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-pink-500 mb-4">🗓 Recent Appointments</h2>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <ul className="space-y-2">
            {summary.recentAppointments.map((apt) => (
              <li key={apt.id} className="border-b pb-2">
                <strong>{apt.client_name}</strong> booked <em>{apt.service_name}</em> on <span className="text-sm">{new Date(apt.start_time).toLocaleString()}</span> — <span className="italic">{apt.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section: Stylists */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-pink-500 mb-4">💇‍♀️ Stylists</h2>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <ul className="space-y-2">
            {summary.stylistList.map((stylist) => (
              <li key={stylist.id}>
                <span className="font-semibold">{stylist.name}</span> — <span className="text-sm text-gray-600">{stylist.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-pink-200">
      <p className="text-gray-700 font-medium">{label}</p>
      <h3 className="text-3xl font-bold text-pink-600">{value}</h3>
    </div>
  );
}

export default AdminDashboard;
