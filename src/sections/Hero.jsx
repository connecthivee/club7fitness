import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { ChevronDown } from 'lucide-react'
import { getImagePath } from '../utils/imagePath'
import EnquiryForm from '../components/EnquiryForm'

const Hero = () => {
  // Logo and video stay visible - no fade effects
  const [isFormOpen, setIsFormOpen] = useState(false)

  // YouTube video ID - Gym/Fitness video
  const youtubeVideoId = 'pWifGjzL8aM' // Gym fitness video

  return (
    <section 
      id="home"
      className="relative w-full overflow-hidden bg-club-dark"
    >
      {/* YouTube Video Background - Full Screen Stretched */}
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&start=0`}
            title="Gym Fitness Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full scale-[1.1] md:scale-[1.25]"
            style={{
              width: '100vw',
              height: '100vh',
              minWidth: '100%',
              minHeight: '100%',
              transformOrigin: 'center center',
              pointerEvents: 'none',
              objectFit: 'cover',
            }}
          />
        </div>
        
        {/* Very subtle overlay for better logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-club-dark/20 z-10"></div>

        {/* Logo Image prominently displayed over video */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6 md:px-8">
          <motion.img
            src={getImagePath('assets/images/rtyu45mm.png')}
            alt="Club 7 Fitness"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-[85vw] sm:w-[75vw] md:w-auto max-w-[85vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.8))',
            }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white cursor-pointer group"
          >
            <motion.span 
              className="text-xs uppercase tracking-widest font-semibold"
              whileHover={{ color: '#3b82f6' }}
            >
              Scroll
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <ChevronDown size={24} className="group-hover:text-club-blue transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Text Content Below Video */}
      <div className="relative bg-club-dark py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Main headline */}
            <motion.h1
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-center mb-4 sm:mb-6 tracking-tight font-display"
            >
              <motion.span 
                className="block text-balance text-white mb-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}
              >
                ELITE TRAINING
              </motion.span>
              <motion.span 
                className="block text-club-blue text-balance"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ textShadow: '0 4px 20px rgba(59, 130, 246, 0.6)' }}
              >
                REDEFINED
              </motion.span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-club-steel text-center max-w-2xl mx-auto mb-12 font-light tracking-wide"
            >
              Where discipline meets excellence. Premium equipment, elite coaching, zero compromise.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 200 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => setIsFormOpen(true)}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    boxShadow: '0 15px 50px rgba(59, 130, 246, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                START YOUR JOURNEY
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      <EnquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}

export default Hero
