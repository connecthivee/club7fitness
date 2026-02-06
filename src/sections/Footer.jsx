import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { fadeInUp } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      id="contact"
      className="relative bg-club-charcoal border-t border-club-steel/10"
      style={{
        backgroundImage: `url(${getImagePath('assets/images/footer-bg.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-club-charcoal/95"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand - Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative inline-block"
              >
                <motion.img
                  src={getImagePath('assets/images/rtyu45mm.png')}
                  alt="Club 7 Fitness"
                  className="h-28 md:h-36 lg:h-40 w-auto object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    filter: 'drop-shadow(0 15px 40px rgba(59, 130, 246, 0.4))',
                  }}
                />
              </motion.div>
            </div>
            <p className="text-club-steel font-light leading-relaxed text-left max-w-xs">
              Where elite athletes are forged.<br />
              Train with purpose, achieve<br />
              greatness.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Programs', 'Membership', 'Trainers', 'Schedule', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-club-steel hover:text-club-blue transition-colors duration-200 font-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-club-steel font-light">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-club-blue" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Delhi,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-club-blue transition-colors duration-200"
                >
                  Delhi, India
                </a>
              </li>
              <li className="flex items-center gap-3 text-club-steel font-light">
                <Phone size={18} className="flex-shrink-0 text-club-blue" />
                <a 
                  href="https://wa.me/917008310868"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-club-blue transition-colors duration-200"
                >
                  +91 7008310868
                </a>
              </li>
              <li className="flex items-center gap-3 text-club-steel font-light">
                <Mail size={18} className="flex-shrink-0 text-club-blue" />
                <a 
                  href="mailto:info@club7fitness.com"
                  className="hover:text-club-blue transition-colors duration-200"
                >
                  info@club7fitness.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social & Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              <motion.a
                href="https://www.instagram.com/club7_fitness_?igsh=bDBscjR6cjl1Z2J5"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full bg-club-blue/10 border border-club-blue/30 flex items-center justify-center text-club-blue hover:bg-club-blue hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
            <div className="text-club-steel font-light">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-club-dark/50 border border-club-blue/10 hover:border-club-blue/30 transition-colors duration-300">
                  <span className="text-sm font-medium text-white">Mon - Fri</span>
                  <span className="text-sm text-club-blue font-semibold">5AM - 11PM</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-club-dark/50 border border-club-blue/10 hover:border-club-blue/30 transition-colors duration-300">
                  <span className="text-sm font-medium text-white">Saturday</span>
                  <span className="text-sm text-club-blue font-semibold">6AM - 10PM</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-club-dark/50 border border-club-blue/10 hover:border-club-blue/30 transition-colors duration-300">
                  <span className="text-sm font-medium text-white">Sunday</span>
                  <span className="text-sm text-club-blue font-semibold">7AM - 9PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-club-steel/10 flex flex-col md:flex-row justify-between items-center gap-4 text-club-steel text-sm font-light"
        >
          <p>&copy; {currentYear} Club 7 Fitness. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-club-blue transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-club-blue transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Gradient accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-blue to-transparent"></div>
    </footer>
  )
}

export default Footer
