import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FullServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://essence-b1fv.onrender.com/api/services') // Replace with your actual endpoint
      .then((response) => {
         console.log('API response data:', response.data);
  setServices(response.data);
  setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading services...</p>;
  }

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-10">
    {Array.isArray(services) && services.length > 0 ? (
      services.map((service) => (
        <div
          key={service.id}
          className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={`/assets/services/${service.image}`}
            alt={service.name}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-1">{service.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{service.description}</p>
            <p className="text-sm text-gray-800 font-medium">
              Duration: {service.duration} min
            </p>
            <p className="text-sm text-gray-800 font-medium">
              Price: Ksh.{service.price}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center py-10">No services available.</p>
    )}
  </div>
  );
}

export default FullServiceList;
