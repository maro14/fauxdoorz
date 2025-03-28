import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 bg-orange-500 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Exclusive Offers</h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our newsletter and be the first to know about special deals and new properties.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>
          
          {status === 'success' && (
            <p className="mt-4 text-white bg-green-500/20 py-2 px-4 rounded-lg inline-block">
              Thank you for subscribing!
            </p>
          )}
          
          <p className="mt-6 text-sm opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}