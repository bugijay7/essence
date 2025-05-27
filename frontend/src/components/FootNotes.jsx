import React from 'react';

function FootNotes() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center text-sm">
        <p className="mb-2">&copy; {new Date().getFullYear()} <span className="font-semibold">Yohan Labs</span>. All rights reserved.</p>
        <p className="text-gray-400">Empowering innovation with code.</p>
        <p className="text-gray-400">+254 702443418</p>
      </div>
    </footer>
  );
}

export default FootNotes;
