import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'Do I need to book in advance?',
    answer: 'Yes, we recommend booking early to secure your preferred stylist and time.',
  },
  {
    question: 'What if I’m late for my appointment?',
    answer: 'We allow a 10-minute grace period. Beyond that, your session may be shortened or rescheduled.',
  },
  {
    question: 'Do you accept walk-ins?',
    answer: 'Walk-ins are welcome but subject to availability. Booking guarantees your spot.',
  },
  {
    question: 'What’s your cancellation policy?',
    answer: 'Cancellations must be made at least 24 hours in advance to avoid a fee.',
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
      {/* Left Section */}
      <div>
        <h2 className="text-6xl text-pink-400 font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600">
          Got questions? We’ve got answers. Here are the most common things our clients ask about
          appointments, policies, and walk-ins.
        </p>
      </div>

      {/* Right Section: FAQ Accordions */}
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b">
            <button
              className="flex justify-between items-center w-full py-3 text-left font-medium"
              onClick={() => toggle(index)}
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <p className="text-gray-600 pb-3 transition">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQAccordion;
