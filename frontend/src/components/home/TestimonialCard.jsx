import React from 'react';
import { FaStar } from 'react-icons/fa';
import client1 from '../../assets/client1.jpeg';
import client2 from '../../assets/client2.jpeg';
import client3 from '../../assets/client3.jpeg';
import awardImg from '../../assets/award.jpeg'; // Add your award image here

const testimonials = [
  {
    name: 'Amina Hassan',
    feedback: 'Absolutely loved the facial treatment. My skin has never felt better!',
    image: client1,
  },
  {
    name: 'Grace Wambui',
    feedback: 'Professional and friendly service. The hair styling was on point!',
    image: client2,
  },
  {
    name: 'Linet Atieno',
    feedback: 'I got a relaxing massage and it was pure bliss. Highly recommended!',
    image: client3,
  },
];

function TestimonialCard() {
  return (
    <div className="py-12 px-4 bg-base-100">
      {/* Award Section */}
      <div className="max-w-[1000px] mx-auto mb-12 flex flex-col md:flex-row items-center gap-6 px-4">
        <img
          src={awardImg}
          alt="Award"
          className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md"
        />
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-3">Best Beauty Spa Award 2024</h2>
          <p className="text-gray-700">
            We are proud to have been honored with the *Best Beauty Spa Award 2024* for our exceptional service, attention to detail, and commitment to customer satisfaction. This recognition is a testament to our team’s passion and dedication to excellence in the beauty industry.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
        {testimonials.map((client, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-6 text-center max-w-[300px] mx-auto">
            <img
              src={client.image}
              alt={client.name}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
            />
            <div className="flex justify-center mb-3 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-sm text-gray-700 italic mb-3">"{client.feedback}"</p>
            <h3 className="font-semibold text-lg">{client.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialCard;
