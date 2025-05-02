'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-10 bg-black border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-bold text-white">
              <span className="text-accent">B</span>havesh <span className="text-accent">P</span>abnani
            </a>
            <p className="text-white/50 text-sm mt-2">
              Full Stack Developer | Data Scientist | ML Engineer
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex gap-8"
          >
            <div>
              <h4 className="text-white/70 text-sm font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-white/50 hover:text-accent text-sm transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-white/50 hover:text-accent text-sm transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-white/50 hover:text-accent text-sm transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/50 hover:text-accent text-sm transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white/70 text-sm font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/50 hover:text-accent text-sm transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/50 hover:text-accent text-sm transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-xs">
            &copy; {currentYear} Bhavesh Pabnani. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex gap-6">
            <a
              href="https://linkedin.com/in/bhavesh-pabnani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/bhavesh-pabnani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="#contact"
              className="text-white/40 hover:text-accent transition-colors"
            >
              Contact
            </a>
          </div>
          
          <div className="hidden md:block">
            <a
              href="/docs/Bhavesh_Pabnani_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-accent transition-colors text-xs"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 