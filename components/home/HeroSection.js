import Link from 'next/link';
import SearchBox from '../SearchBox';

export default function HeroSection({ onSearch }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center mb-12"
      style={{
        backgroundImage: `url(/House.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center md:text-left md:max-w-3xl">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 leading-tight">
          Find Your Perfect <span className="text-orange-500">Vacation Home</span>
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
          Discover beautiful vacation rentals in top destinations worldwide. Book unique homes and experiences all around the globe.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <Link 
            href="/properties" 
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg font-medium transition-colors shadow-lg"
          >
            Browse Properties
          </Link>
          <Link 
            href="/host" 
            className="bg-white hover:bg-gray-100 text-gray-900 py-3 px-8 rounded-lg font-medium transition-colors shadow-lg"
          >
            Become a Host
          </Link>
        </div>
      </div>
      
      {/* Search Box - Positioned at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden">
          <SearchBox onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}