import Link from 'next/link';
import { Caveat } from 'next/font/google';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const caveat = Caveat({ subsets: ['latin'] });

export default function Footer() {
  return (
    <footer className="bg-white/80 border-t border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <span className={`${caveat.className} text-3xl text-gray-800 hover:text-gray-600 transition-colors`}>
              pranay bathini
            </span>
          </Link>

          {/* Quote */}
          <div className="my-6 md:my-0 max-w-md text-center md:text-right italic text-gray-600">
            &quot;Truth can only be found in one place: the code.&quot;
            <span className="block text-sm mt-2">- Robert C. Martin</span>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-6 p-0 border-0">
            <Link 
              href="https://github.com/yourusername" 
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition-colors inline-flex"
            >
              <FaGithub size={28} />
            </Link>
            <Link 
              href="https://linkedin.com/in/yourusername" 
              target="_blank"
              className="text-gray-600 hover:text-gray-900 transition-colors inline-flex"
            >
              <FaLinkedin size={28} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
