import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingPage() {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [formData, setFormData] = useState({
    stylist_id: null,
    service_id: '',
    start_time: '',
    notes: '',
  });
  const [message, setMessage] = useState('');

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesRes = await axios.get('https://essence-b1fv.onrender.com/api/services');
        console.log('Fetched services:', servicesRes.data);
        setServices(servicesRes.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    const fetchStylists = async () => {
      try {
        const stylistsRes = await axios.get('https://essence-b1fv.onrender.com/api/stylists');
        console.log('Fetched stylists:', stylistsRes.data);
        setStylists(stylistsRes.data);
      } catch (err) {
        console.error('Error fetching stylists:', err);
      }
    };

    fetchServices();
    fetchStylists();
  }, []);

  // Handle service selection
  const handleServiceChange = (e) => {
    const selectedServiceId = parseInt(e.target.value, 10);
    const selectedService = services.find(s => s.id === selectedServiceId);

    console.log('Selected service ID:', selectedServiceId);
    console.log('Found service object:', selectedService);

    setFormData(prev => ({
      ...prev,
      service_id: selectedServiceId,
      stylist_id: selectedService ? selectedService.stylist_id : null,
    }));
  };

  // Handle datetime change
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log('Updated form data:', { ...formData, [e.target.name]: e.target.value });
  };

  // Submit booking form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    console.log('Submitting form with data:', formData);

    if (!formData.service_id || !formData.stylist_id || !formData.start_time) {
      setMessage('Please complete all fields before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Retrieved token:', token);

      const payload = {
        ...formData,
        stylist_id: parseInt(formData.stylist_id, 10),
        service_id: parseInt(formData.service_id, 10),
      };

      console.log('Payload being sent to API:', payload);

      await axios.post('https://essence-b1fv.onrender.com/api/appointments', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
   
      console.log('Booking payload:', payload);
      console.log('Booking successful!');
      setMessage('Booking successful!');
      setFormData({ stylist_id: null, service_id: '', start_time: '' });
    } catch (err) {
      console.error('Booking failed:', err);
      setMessage(err.response?.data?.message || 'Booking failed.');
    }
  };

  // Identify the selected stylist
  const selectedStylist = stylists.find(s => s.id === formData.stylist_id);
  console.log('Selected stylist:', selectedStylist);

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-start p-8">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-pink-600 mb-4">Book an Appointment</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Hidden stylist_id */}
          <input
            type="hidden"
            name="stylist_id"
            value={formData.stylist_id ?? ''}
          />

          {/* Service selection */}
          <div>
            <label className="block mb-1 font-medium text-pink-700">Select Service</label>
            <select
              name="service_id"
              value={formData.service_id}
              onChange={handleServiceChange}
              className="w-full border border-pink-300 rounded-md px-3 py-2"
              required
            >
              <option value="">-- Choose a service --</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stylist display */}
          {selectedStylist ? (
            <div>
              <label className="block mb-1 font-medium text-pink-700">Stylist</label>
              <input
                type="text"
                value={
                  selectedStylist.user_id 
                    ? `User ID: ${selectedStylist.user_id}` 
                    : 'Stylist Name'
                }
                readOnly
                className="w-full border border-pink-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>
          ) : (
            formData.stylist_id && (
              <p className="text-red-500">Stylist info not available</p>
            )
          )}


        <div>
  <label className="block mb-1 font-medium text-pink-700">Notes (optional)</label>
  <textarea
    name="notes"
    value={formData.notes || ''}
    onChange={handleChange}
    className="w-full border border-pink-300 rounded-md px-3 py-2"
    placeholder="Add any special requests..."
  />
</div>



          {/* Date and time */}
          <div>
            <label className="block mb-1 font-medium text-pink-700">Choose Date & Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full border border-pink-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
          >
            Book Now
          </button>

          {/* Status message */}
          {message && (
            <p className="mt-4 text-center text-pink-600 font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
