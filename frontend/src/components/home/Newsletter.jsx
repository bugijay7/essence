import React from 'react'

function Newsletter() {
  return (
    <div className="hero bg-pink-400 min-h-[50vh]">
    <div className="hero-content flex-col lg:flex-row-reverse">
    {/* Left Text Section */}
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Subscribe to Our Newsletter!</h1>
      <p className="py-6">
        Stay updated with our latest beauty tips, offers, and stylist insights delivered right to your inbox.
      </p>
    </div>

    {/* Right Form Section */}
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Full Name</label>
          <input type="text" className="input" placeholder="Your Name" />

          <label className="label">Email Address</label>
          <input type="email" className="input" placeholder="you@example.com" />

          <button className="btn btn-neutral mt-4">Subscribe</button>
        </fieldset>
      </div>
    </div>
  </div>
</div>

  )
}

export default Newsletter