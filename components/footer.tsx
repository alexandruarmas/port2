'use client';

import { FaLinkedin } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-white/10 bg-transparent py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Identity */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white">Alexandru Armaș</h3>
            <p className="mt-1 text-sm text-gray-400">Dezvoltator Full-Stack</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <h4 className="text-base font-medium text-white">Contact</h4>
            <div className="flex flex-col items-center gap-3 md:items-end">
              <a
                href="mailto:contact@alexandruarmas.ro"
                className="flex items-center text-sm text-gray-400 transition-colors hover:text-purple"
              >
                <HiOutlineMail className="mr-2 h-5 w-5" />
                <span>contact@alexandruarmas.ro</span>
              </a>
              <a
                href="https://www.linkedin.com/in/alexandruarmas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-400 transition-colors hover:text-purple"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="mr-2 h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Alexandru Armaș. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
};
