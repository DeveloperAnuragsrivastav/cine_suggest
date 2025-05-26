import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pink-200 text-pink-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo/Title */}
        <div className="text-lg font-bold">
          🎬 <span className="text-pink-500">Cine</span> Explorer
        </div>


        {/* Right: Copyright */}
        <div className="text-sm text-pink-700">
          &copy; {new Date().getFullYear()} Cine Explorer. All rights reserve By Nancy Verma .
        </div>
      </div>
    </footer>
  );
};

export default Footer;
