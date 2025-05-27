// src/pages/Services.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FullServiceList from '../components/services/FullServiceList';
import FAQAccordion from '../components/services/FAQAccordion';

function Services() {
  return (
    <>
      <section className="py-10 px-4 bg-base-100">
        <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>
        <FullServiceList />
      </section>
      <FAQAccordion />
    </>
  );
}

export default Services;
