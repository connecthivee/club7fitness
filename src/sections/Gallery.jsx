import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Typography, Button } from '@mui/material'
import { X, Play, ExternalLink } from 'lucide-react'
import { staggerContainer, scaleIn } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'

const galleryItems = [
  // Images
  { id: 1, type: 'image', src: getImagePath('assets/images/class-1.jpg'), title: 'Strength Training' },
  { id: 2, type: 'image', src: getImagePath('assets/images/class-2.jpg'), title: 'Cardio Blast' },
  { id: 3, type: 'image', src: getImagePath('assets/images/class-3.jpg'), title: 'Yoga & Flexibility' },
  { id: 4, type: 'image', src: getImagePath('assets/images/class-4.jpg'), title: 'HIIT Training' },
  // Videos
  { 
    id: 5, 
    type: 'video', 
    thumbnail: 'https://img.youtube.com/vi/pWifGjzL8aM/maxresdefault.jpg',
    videoId: 'pWifGjzL8aM',
    title: 'Gym Fitness Training',
    url: 'https://www.youtube.com/watch?v=pWifGjzL8aM'
  },
  { 
    id: 6, 
    type: 'video', 
    thumbnail: 'https://img.youtube.com/vi/j7rKKpwdXNE/maxresdefault.jpg',
    videoId: 'j7rKKpwdXNE',
    title: 'Strength Training',
    url: 'https://www.youtube.com/watch?v=j7rKKpwdXNE'
  },
  { id: 7, type: 'image', src: getImagePath('assets/images/about-banner.png'), title: 'Training Facility' },
  { id: 8, type: 'image', src: getImagePath('assets/images/about-coach.jpg'), title: 'Expert Coaching' },
  { 
    id: 9, 
    type: 'video', 
    thumbnail: 'https://img.youtube.com/vi/ml6cT4AZdqI/maxresdefault.jpg',
    videoId: 'ml6cT4AZdqI',
    title: 'Cardio Workout',
    url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI'
  },
  { 
    id: 10, 
    type: 'video', 
    thumbnail: 'https://img.youtube.com/vi/UItWltVZZmE/maxresdefault.jpg',
    videoId: 'UItWltVZZmE',
    title: 'Yoga & Flexibility',
    url: 'https://www.youtube.com/watch?v=UItWltVZZmE'
  },
  { id: 11, type: 'image', src: getImagePath('assets/images/video-banner.jpg'), title: 'Group Sessions' },
  { id: 12, type: 'image', src: getImagePath('assets/images/hero-banner.png'), title: 'Elite Equipment' },
]

const GalleryItem = ({ item, index, onItemClick, compact = false }) => {
  const isVideo = item.type === 'video'
  
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: compact ? 1.05 : 1.1,
        zIndex: 10,
        transition: { duration: 0.3 }
      }}
      className={`relative ${compact ? 'aspect-square' : 'aspect-[4/3]'} rounded-lg overflow-hidden cursor-pointer group`}
      onClick={() => onItemClick(item)}
    >
      {/* Image or Video Thumbnail */}
      <img 
        src={isVideo ? item.thumbnail : item.src} 
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Video Play Icon Overlay */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            whileHover={{ scale: 1.1, opacity: 1 }}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 md:p-6"
          >
            <Play size={32} className="text-white ml-1" fill="white" />
          </motion.div>
        </div>
      )}
      
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
          {item.title}
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

const ImageModal = ({ item, isOpen, onClose }) => {
  if (!item) return null
  
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
                  src={item.src}
                  alt={item.title}
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
                  {item.title}
                </Typography>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const VideoModal = ({ item, isOpen, onClose }) => {
  if (!item || item.type !== 'video') return null

  const handleWatchOnYouTube = () => {
    window.open(item.url, '_blank', 'noopener,noreferrer')
  }

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
              className="relative bg-club-charcoal rounded-2xl shadow-2xl border border-club-blue/30 max-w-5xl max-h-[90vh] w-full overflow-hidden"
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

              {/* Video Preview */}
              <div className="relative w-full bg-club-dark/50 p-4 sm:p-6">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-lg"
                  />
                </div>
              </div>
              
              {/* Video Title and YouTube Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-club-dark/90 backdrop-blur-sm px-6 py-4 border-t border-club-blue/30"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      fontFamily: 'Montserrat, sans-serif',
                      textAlign: { xs: 'center', sm: 'left' },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleWatchOnYouTube}
                    startIcon={<ExternalLink size={20} />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: '8px',
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
                    Watch on YouTube
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const FullGalleryModal = ({ isOpen, onClose, onItemClick }) => {
  const photos = galleryItems.filter(item => item.type === 'image')
  const videos = galleryItems.filter(item => item.type === 'video')

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
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-club-charcoal rounded-2xl shadow-2xl border border-club-blue/30 max-w-7xl max-h-[90vh] w-full overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.2)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-club-blue/30 bg-club-dark/90">
                <Typography
                  variant="h4"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 800,
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  OUR <span className="text-club-blue">GALLERY</span>
                </Typography>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={onClose}
                  className="bg-club-dark/90 hover:bg-club-dark border border-club-blue/50 hover:border-club-blue rounded-full p-2 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="text-white group-hover:text-club-blue transition-colors" />
                </motion.button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Photos Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      fontFamily: 'Montserrat, sans-serif',
                      mb: 3,
                    }}
                  >
                    📸 <span className="text-club-blue">Photos</span>
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((item, index) => (
                      <GalleryItem 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        onItemClick={onItemClick}
                        compact={true}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Videos Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      fontFamily: 'Montserrat, sans-serif',
                      mb: 3,
                    }}
                  >
                    🎥 <span className="text-club-blue">Videos</span>
                  </Typography>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos.map((item, index) => (
                      <GalleryItem 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        onItemClick={onItemClick}
                        compact={true}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false)
  
  const initialItemsCount = 6
  const initialItems = galleryItems.slice(0, initialItemsCount)
  const hasMoreItems = galleryItems.length > initialItemsCount

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }

  const handleViewMore = () => {
    setIsFullGalleryOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseFullGallery = () => {
    setIsFullGalleryOpen(false)
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
            See our facility, equipment, and community in action. Watch our training videos and browse photos.
          </motion.p>
        </motion.div>

        {/* Gallery grid - Show only initial items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
        >
          {initialItems.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} onItemClick={handleItemClick} />
          ))}
        </motion.div>

        {/* View More Button */}
        {hasMoreItems && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center"
          >
            <Button
              variant="outlined"
              onClick={handleViewMore}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '8px',
                borderColor: '#3b82f6',
                color: '#3b82f6',
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#2563eb',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              View More
            </Button>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      {selectedItem && selectedItem.type === 'image' && (
        <ImageModal 
          item={selectedItem} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Video Modal */}
      {selectedItem && selectedItem.type === 'video' && (
        <VideoModal 
          item={selectedItem} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Full Gallery Modal */}
      <FullGalleryModal 
        isOpen={isFullGalleryOpen}
        onClose={handleCloseFullGallery}
        onItemClick={(item) => {
          handleCloseFullGallery()
          setTimeout(() => {
            handleItemClick(item)
          }, 300)
        }}
      />
    </section>
  )
}

export default Gallery
