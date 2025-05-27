import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-neutral text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="flex items-center gap-2"><FaPhoneAlt /> +254 712 345 678</p>
          <p className="flex items-center gap-2 mt-2"><FaEnvelope /> info@earthandessence.co.ke</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Stylists</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-5 text-lg">
            <a href="#" className="hover:text-pink-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="hover:text-pink-400"><FaTwitter /></a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
