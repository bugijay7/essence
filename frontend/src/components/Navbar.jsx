import React from 'react'
import { Link } from 'react-router-dom';
function Navbar() {
  return (
 <div className="navbar bg-pink-400 shadow-lg">
   <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content text-white  bg-pink-400 rounded-box z-1 mt-3 w-52 p-2 shadow">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/services">Services</Link></li>
  <li><Link to="/stylists">Stylists</Link></li>
  <li><Link to="/login">Login</Link></li>
  <li><Link to="/register">Register</Link></li>
</ul>

    </div>
  </div>
 <div className="navbar-center flex flex-col items-center">
  <span className="btn btn-ghost text-2xl">Earth and Essence</span>
  <span className="text-sm italic text-gray-500">Glow Gently, Live Boldly.</span>
</div>

  <div className="navbar-end">
  <a href="/contact" className="btn btn-primary text-white">
    Contact
  </a>
</div>

</div>
  )
}

export default Navbar