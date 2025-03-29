import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaHome, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

const footerLinks = [
  {
    title: 'Discover',
    links: [
      { href: '/properties', label: 'Browse Properties' },
      { href: '/destinations', label: 'Popular Destinations' },
      { href: '/deals', label: 'Special Deals' },
      { href: '/reviews', label: 'Guest Reviews' },
    ]
  },
  {
    title: 'Host',
    links: [
      { href: '/host', label: 'Become a Host' },
      { href: '/dashboard', label: 'Host Dashboard' },
      { href: '/resources', label: 'Hosting Resources' },
      { href: '/community', label: 'Host Community' },
    ]
  },
  {
    title: 'Support',
    links: [
      { href: '/help', label: 'Help Center' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/faq', label: 'FAQs' },
      { href: '/safety', label: 'Safety Information' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/accessibility', label: 'Accessibility' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-orange-500">fauxDoorz</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Find your perfect getaway with fauxDoorz. We connect travelers with unique accommodations around the world.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="w-5 h-5 text-orange-500 mr-3" />
                <span>123 Vacation Lane, Travel City</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaPhone className="w-5 h-5 text-orange-500 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="w-5 h-5 text-orange-500 mr-3" />
                <span>contact@fauxdoorz.com</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-900 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-100 text-orange-500 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-200"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-gray-600">Subscribe to our newsletter</span>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} fauxDoorz. All rights reserved.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Made with <FaHeart className="text-orange-500 mx-1" /> by fauxDoorz Team
          </p>
        </div>
      </div>
    </footer>
  );
}
