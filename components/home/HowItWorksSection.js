import { FaSearch, FaCalendarCheck, FaKey } from 'react-icons/fa';

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      icon: <FaSearch className="text-4xl text-orange-500" />,
      title: 'Find Your Perfect Property',
      description: 'Search our curated collection of vacation rentals using filters for location, price, and amenities.',
    },
    {
      id: 2,
      icon: <FaCalendarCheck className="text-4xl text-orange-500" />,
      title: 'Book Securely Online',
      description: 'Reserve your stay with our secure booking system. No hidden fees, instant confirmation.',
    },
    {
      id: 3,
      icon: <FaKey className="text-4xl text-orange-500" />,
      title: 'Enjoy Your Stay',
      description: 'Get all the details for check-in and enjoy a worry-free vacation in your chosen property.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">How FauxDoorz Works</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Finding and booking your dream vacation rental is easy
        </p>
        
        <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center mb-8 md:mb-0 md:w-1/3 px-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-orange-200">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-400"></div>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}