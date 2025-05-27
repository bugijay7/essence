import React from 'react';
import HappyClients from '../../assets/happy-clients.jpeg';
import NaturalProducts from '../../assets/natural-products.jpeg';
import YearsService from '../../assets/years-service.jpeg';
import FiveStar from '../../assets/five-star.jpeg';

const accomplishments = [
  {
    id: 1,
    number: '1000+',
    text: 'Happy Clients Served',
    image: HappyClients,
  },
  {
    id: 2,
    number: '50+',
    text: 'Natural Products Used',
    image: NaturalProducts,
  },
  {
    id: 3,
    number: '10+',
    text: 'Years of Service',
    image: YearsService,
  },
  {
    id: 4,
    number: '5+',
    text: 'Star Customer Ratings',
    image: FiveStar,
  },
];

function Accomplishment() {
  return (
    <div className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Our Accomplishments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl max-h-100 mx-auto">
        {accomplishments.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden shadow-lg relative h-72 group"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="inset-15 bg-black group-hover:bg-black/60 transition duration-300 flex flex-col justify-end items-end text-white text-center px-4">
              <h3 className="text-5xl font-extrabold mb-2">{item.number}</h3>
              <p className="text-lg font-medium">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accomplishment;
