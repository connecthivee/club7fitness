import React from 'react'
import { motion } from 'framer-motion'
import { getImagePath } from '../utils/imagePath'

/**
 * Club 7 Fitness Logo Component
 * Uses the actual logo image file
 */
const Logo = ({ className = '', size = 'default', showSlogan = false, imageSrc = null }) => {
  const sizes = {
    small: 'h-12 md:h-16',
    default: 'h-16 md:h-20',
    large: 'h-24 md:h-32 lg:h-40'
  }

  // Logo image path
  const logoPath = imageSrc || getImagePath('assets/images/club7-logo.jpeg')

  return (
    <motion.div 
      className={`inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={logoPath}
        alt="Club 7 Fitness"
        className={`${sizes[size]} w-auto object-contain drop-shadow-2xl`}
        style={{
          filter: 'drop-shadow(0 10px 30px rgba(59, 130, 246, 0.3))'
        }}
      />
    </motion.div>
  )
}

export default Logo
