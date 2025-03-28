import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York',
      image: '/images/testimonials/user1.jpg',
      rating: 5,
      text: 'Our stay was absolutely perfect! The property was exactly as described, and the host was incredibly responsive. We\'ll definitely be booking through FauxDoorz again.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'San Francisco',
      image: '/images/testimonials/user2.jpg',
      rating: 5,
      text: 'The booking process was seamless, and the property exceeded our expectations. The amenities were top-notch, and the location was perfect for our family vacation.',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Miami',
      image: '/images/testimonials/user3.jpg',
      rating: 4,
      text: 'FauxDoorz made finding our dream vacation home so easy. The search filters helped us narrow down exactly what we wanted, and we found the perfect beachfront property.',
    },
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">What Our Guests Say</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Hear from travelers who found their perfect vacation homes on FauxDoorz
        </p>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 relative">
                    <FaQuoteLeft className="text-orange-200 text-4xl absolute top-6 left-6" />
                    <div className="flex items-center mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.location}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}