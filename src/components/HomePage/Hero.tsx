import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-colors">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-white">I am <br /> Shrisant Adhikari</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, omnis!</p> 
          <button className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 cursor-pointer">
            View Portfolio
          </button>
        </div>

        <Image
        //   src="/shrisant-hero.png"
          src="/hero-image.jpg" 
          alt="Designer"
          width={400}
          height={600}
          className="rounded-lg"
        />
      </div>
    </section>
  );
};

export default Hero;