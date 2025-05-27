import React, { useState, useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';

function StylingList() {
  const [stylists, setStylists] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/stylists') // Your backend endpoint
      .then((response) => {
        console.log('Stylist API response:', response.data);
        console.log('Response data:', response.data); // fixed here

        if (Array.isArray(response.data)) {
          setStylists(response.data);
        } else if (Array.isArray(response.data.stylists)) {
          setStylists(response.data.stylists);
        } else if (Array.isArray(response.data.data)) {
          setStylists(response.data.data);
        } else {
          throw new Error('Invalid stylist data format');
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stylists:', err);
        setError('Failed to load stylists.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading stylists...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="py-12 px-6 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-10">Our Styling Experts</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {stylists.length > 0 ? (
          stylists.map((stylist, i) => (
            <div
              key={stylist.id || i}
              className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"
              onClick={() => setSelected(stylist)}
            >
              <img
                src={`/assets/stylists/${stylist.profile_pic}`}
                alt={stylist.name || 'Stylist'}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold">{stylist.name || `Stylist #${stylist.id}`}</h3>
                 <p className="text-sm text-gray-500 mt-2">{stylist.bio}</p>
                <p className="text-sm text-pink-600">{stylist.specialties}</p>
                 <p className="text-sm text-black-700 mt-2">  📞 {stylist.phone || 'Phone not available'} </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No stylists available.</p>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-xl font-bold"
              aria-label="Close stylist details"
            >
              ✕
            </button>
            <img
              src={`/assets/stylists/${selected.profile_pic}`}
              alt={selected.name || 'Selected stylist'}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold">{selected.name || `Stylist #${selected.id}`}</h3>
            <p className="text-gray-600 mb-2">{selected.specialties}</p>
            <p className="text-sm text-gray-700 mb-4">{selected.bio}</p>
            <p className="flex items-center gap-2 font-medium text-pink-700">
              <FaPhoneAlt /> {selected.phone || 'Phone not available'}
            </p>
            <a href="/login" className="btn btn-primary text-white">Book Appointment </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default StylingList;
