import React from 'react';
import stylist1 from '../../assets/stylist1.jpeg';
import stylist2 from '../../assets/stylist2.jpeg';
import stylist3 from '../../assets/stylist3.jpeg';

const stylists = [
  {
    name: 'Wanjiku Mwangi',
    services: 'Hair Braiding, Weaving, Haircuts',
    image: stylist1,
  },
  {
    name: 'Achieng Otieno',
    services: 'Facials, Skin Treatments, Makeup',
    image: stylist2,
  },
  {
    name: 'Nyambura Njeri',
    services: 'Nail Art, Pedicure, Gel Polish',
    image: stylist3,
  },
];

function StylistCard() {
  return (
    <div className="py-10 px-4 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Stylists</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
        {stylists.map((stylist, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden text-center max-w-[300px] mx-auto"
          >
            <img
              src={stylist.image}
              alt={stylist.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-left">
              <h3 className="text-lg font-semibold">{stylist.name}</h3>
              <p className="text-sm text-pink-800">{stylist.services}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Meet All Stylists Link */}
      <div className="text-center mt-8">
        <a
          href="/stylists" // You can change this to your desired route or handler
          className="text-pink-600 hover:underline text-md font-medium"
        >
          Meet All Stylists →
        </a>
      </div>
    </div>
  );
}

export default StylistCard;
