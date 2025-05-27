import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg1 from '../../assets/hero.jpg';
import heroImg2 from '../../assets/hero2.jpg';
import heroImg3 from '../../assets/hero3.jpg';

const slides = [
  {
    image: heroImg1,
    title: 'Glow Gently, Live Boldly.',
    description:
      'Welcome to Earth and Essence — where your inner light meets natural beauty. Discover serenity, self-care, and style in one holistic space.',
  },
  {
    image: heroImg2,
    title: 'Shine Bright, Stay Grounded.',
    description:
      'At Earth and Essence, we balance radiance and wellness. Embrace the harmony of beauty and calm in every experience.',
  },
  {
    image: heroImg3,
    title: 'Radiate Confidence, Naturally.',
    description:
      'Uncover your best self with nature-inspired care. Earth and Essence invites you to glow from within and thrive in your essence.',
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Preload images and setup slider interval
  useEffect(() => {
    // ✅ Preload all slide images
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });

    // ✅ Set interval to switch slides
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="hero min-h-screen transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 transition-opacity duration-1000"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md transition-opacity duration-500 ease-in-out">
          <h1 className="mb-5 text-5xl font-bold">{currentSlide.title}</h1>
          <p className="mb-5">{currentSlide.description}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
          Book Your Appointment</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
