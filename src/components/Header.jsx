import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show background when scrolled past 50px
      setIsScrolled(currentScrollY > 50)
      
      // Fade out when scrolling down, fade in when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true)
      }
      
      // Always show at the top
      if (currentScrollY < 10) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Classes', href: '#classes' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.3 }
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-club-dark/95 backdrop-blur-md shadow-lg border-b border-club-blue/20' 
          : 'bg-transparent'
      }`}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
        <div className="flex items-center justify-center">
          {/* Navigation Links - Visible on all screen sizes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap justify-center"
          >
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="text-white hover:text-club-blue font-semibold transition-colors duration-200 text-xs sm:text-sm uppercase tracking-wider relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-club-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </motion.div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header

