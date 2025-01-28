export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          {/* Logo & Copyright */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">fauxDoorz</h2>
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} fauxDoorz. All rights reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6">
            <a href="/about" className="text-gray-400 hover:text-white transition">About</a>
            <a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a>
            <a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 hover:opacity-80" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/twitter.svg" alt="Twitter" className="w-6 h-6 hover:opacity-80" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 hover:opacity-80" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6 hover:opacity-80" />
            </a>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-500">
          Made with ❤️ by fauxDoorz Team
        </div>
      </div>
    </footer>
  );
}
