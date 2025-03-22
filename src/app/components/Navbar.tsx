import Link from 'next/link';
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'] });

export default function Navbar() {
  return (
    <nav className="bg-white/80 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center h-14">
          {/* Logo */}
          <Link href="/">
            <span className={`${caveat.className} text-3xl text-gray-800 hover:text-gray-600 transition-colors`}>
              pranay bathini
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="https://linkedin.com/in/pranaybathini" 
              className="relative text-gray-600 hover:text-gray-900 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all"
            >
              About
            </Link>
            <Link 
              href="/archives" 
              className="relative text-gray-600 hover:text-gray-900 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gray-900 after:transition-all"
            >
              Archives
            </Link>
            <Link 
              href="https://linkedin.com/in/pranaybathini" 
              className="px-4 py-1.5 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
