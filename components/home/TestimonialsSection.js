import { useState, useEffect } from 'react';
// Remove FaQuoteLeft from imports
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { faker } from '@faker-js/faker';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  
  // Generate random testimonials using faker.js
  useEffect(() => {
    const generateTestimonials = () => {
      const locations = ['New York', 'San Francisco', 'Miami', 'Chicago', 'Seattle', 'Austin', 'Boston'];
      const testimonialTexts = [
        'Our stay was absolutely perfect! The property was exactly as described, and the host was incredibly responsive. We\'ll definitely be booking through FauxDoorz again.',
        'The booking process was seamless, and the property exceeded our expectations. The amenities were top-notch, and the location was perfect for our family vacation.',
        'FauxDoorz made finding our dream vacation home so easy. The search filters helped us narrow down exactly what we wanted, and we found the perfect beachfront property.',
        'We had an amazing experience with our rental. The photos didn\'t do it justice - it was even more beautiful in person!',
        'The customer service was exceptional. When we had a question about the property, the host responded within minutes.',
        'This was our third time using FauxDoorz and we\'ve never been disappointed. The properties are always clean, well-maintained, and as advertised.'
      ];
      
      const generatedTestimonials = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: faker.person.fullName(),
        location: faker.helpers.arrayElement(locations),
        avatar: faker.image.avatar(),
        rating: faker.number.int({ min: 4, max: 5 }),
        text: faker.helpers.arrayElement(testimonialTexts),
        date: faker.date.recent({ days: 60 }),
      }));
      
      setTestimonials(generatedTestimonials);
    };
    
    generateTestimonials();
  }, []);
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => 
      (current + 1) % testimonials.length
    );
  };
  
  if (testimonials.length === 0) {
    return null; // Don't render until testimonials are generated
  }
  
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-600">
            Hear from travelers who found their perfect vacation homes on FauxDoorz
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm h-12 w-12 flex items-center justify-center rounded-r-xl shadow-sm hover:bg-orange-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-orange-500" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm h-12 w-12 flex items-center justify-center rounded-l-xl shadow-sm hover:bg-orange-50 transition-colors"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-orange-500" />
          </button>
          
          {/* Testimonial Cards */}
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-white p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                      <div className="md:w-1/3 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-orange-100">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-xl mb-1">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{testimonial.location}</p>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < testimonial.rating ? "text-yellow-400" : "text-gray-200"} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs">
                          {new Date(testimonial.date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div className="md:w-2/3 relative">
                        <p className="text-gray-700 italic text-lg leading-relaxed">
                          {testimonial.text}
                        </p>
                      </div>
                    </div>
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
                className={`w-2 h-2 mx-1 rounded-full transition-colors ${
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