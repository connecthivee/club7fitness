import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Typography } from '@mui/material'
import { X } from 'lucide-react'
import { staggerContainer, scaleIn } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'

const galleryImages = [
  { id: 1, src: getImagePath('assets/images/class-1.jpg'), title: 'Strength Training' },
  { id: 2, src: getImagePath('assets/images/class-2.jpg'), title: 'Cardio Blast' },
  { id: 3, src: getImagePath('assets/images/class-3.jpg'), title: 'Yoga & Flexibility' },
  { id: 4, src: getImagePath('assets/images/class-4.jpg'), title: 'HIIT Training' },
  { id: 5, src: getImagePath('assets/images/about-banner.png'), title: 'Training Facility' },
  { id: 6, src: getImagePath('assets/images/about-coach.jpg'), title: 'Expert Coaching' },
  { id: 7, src: getImagePath('assets/images/video-banner.jpg'), title: 'Group Sessions' },
  { id: 8, src: getImagePath('assets/images/hero-banner.png'), title: 'Elite Equipment' },
]

const GalleryItem = ({ image, index, onImageClick }) => {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 0.3 }
      }}
      className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => onImageClick(image)}
    >
      <img 
        src={image.src} 
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 700,
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          {image.title}
        </Typography>
      </motion.div>

      {/* Border effect */}
      <motion.div
        className="absolute inset-0 border-2 border-club-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  )
}

const ImageModal = ({ image, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={onClose}
            style={{
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Popup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-club-charcoal rounded-2xl shadow-2xl border border-club-blue/30 max-w-4xl max-h-[85vh] w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.2)',
              }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-60 bg-club-dark/90 hover:bg-club-dark border border-club-blue/50 hover:border-club-blue rounded-full p-2 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} className="text-white group-hover:text-club-blue transition-colors" />
              </motion.button>

              {/* Image */}
              <div className="relative w-full h-auto max-h-[70vh] flex items-center justify-center bg-club-dark/50 p-4">
                <img
                  src={image.src}
                  alt={image.title}
                  className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg"
                />
              </div>
              
              {/* Image Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-club-dark/90 backdrop-blur-sm px-6 py-4 border-t border-club-blue/30"
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 700,
                    fontFamily: 'Montserrat, sans-serif',
                    textAlign: 'center',
                  }}
                >
                  {image.title}
                </Typography>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }

  return (
        <section id="gallery" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-club-dark">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12 sm:mb-16 md:mb-20"
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 font-display"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            OUR <span className="text-club-blue">GALLERY</span>
          </motion.h2>
          <motion.p 
            className="text-club-steel text-lg md:text-xl font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            See our facility, equipment, and community in action.
          </motion.p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {galleryImages.map((image, index) => (
            <GalleryItem key={image.id} image={image} index={index} onImageClick={handleImageClick} />
          ))}
        </motion.div>
      </div>

      {/* Image Modal */}
      <ImageModal 
        image={selectedImage} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  )
}

export default Gallery
