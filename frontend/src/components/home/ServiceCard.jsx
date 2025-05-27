import React from 'react';
import hairImg from '../../assets/hair.jpeg';
import facialImg from '../../assets/facial.jpeg';
import nailsImg from '../../assets/nails.jpeg';
import massageImg from '../../assets/massage.jpeg';

const services = [
  {
    title: 'Hair Styling',
    description: 'Cuts, color, and styling tailored to you.',
    image: hairImg,
  },
  {
    title: 'Facials & Skincare',
    description: 'Glow naturally with deep cleansing and hydration.',
    image: facialImg,
  },
  {
    title: 'Nail Care',
    description: 'Manicures and pedicures with a flawless finish.',
    image: nailsImg,
  },
  {
    title: 'Massage Therapy',
    description: 'Relax and recharge with holistic treatments.',
    image: massageImg,
  },
];

function ServiceCard() {
  return (
    <div className="py-10 px-4 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[400px] mx-auto"
          >
            <div className="aspect-[4/3]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCard;
