import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@mui/material'
import { ChevronDown, Play, ChevronLeft, ChevronRight, Volume2, VolumeX, ExternalLink } from 'lucide-react'
import { getImagePath } from '../utils/imagePath'
import EnquiryForm from '../components/EnquiryForm'

const Hero = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [videoTime, setVideoTime] = useState(0)
  const thumbnailContainerRef = useRef(null)
  const iframeRef = useRef(null)
  const playerRef = useRef(null)
  const playerReadyRef = useRef(false)
  
  const thumbnailsPerView = 4 // Show 4 thumbnails at a time

  // Multiple YouTube videos
  const youtubeVideos = [
    {
      id: 'pWifGjzL8aM',
      title: 'Gym Fitness Training',
      thumbnail: `https://img.youtube.com/vi/pWifGjzL8aM/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=pWifGjzL8aM'
    },
    {
      id: 'j7rKKpwdXNE',
      title: 'Strength Training',
      thumbnail: `https://img.youtube.com/vi/j7rKKpwdXNE/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=j7rKKpwdXNE'
    },
    {
      id: 'ml6cT4AZdqI',
      title: 'Cardio Workout',
      thumbnail: `https://img.youtube.com/vi/ml6cT4AZdqI/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI'
    },
    {
      id: 'UItWltVZZmE',
      title: 'Yoga & Flexibility',
      thumbnail: `https://img.youtube.com/vi/UItWltVZZmE/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=UItWltVZZmE'
    },
    {
      id: 'IBaXvQy9kXk',
      title: 'HIIT Workout',
      thumbnail: `https://img.youtube.com/vi/IBaXvQy9kXk/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=IBaXvQy9kXk'
    }
  ]

  const handleThumbnailClick = (index) => {
    setActiveVideoIndex(index)
    // Auto-scroll to show the selected video if it's not in current view
    if (index < thumbnailStartIndex || index >= thumbnailStartIndex + thumbnailsPerView) {
      // Calculate the start index to show the selected video
      const newStartIndex = Math.max(0, Math.min(index - Math.floor(thumbnailsPerView / 2), youtubeVideos.length - thumbnailsPerView))
      setThumbnailStartIndex(newStartIndex)
    }
  }

  const handleVideoClick = (url) => {
    if (url) {
      // Add timestamp to URL if video time is tracked
      const urlWithTime = videoTime > 0 ? `${url}&t=${Math.floor(videoTime)}` : url
      window.open(urlWithTime, '_blank', 'noopener,noreferrer')
    }
  }

  // Initialize YouTube IFrame API
  useEffect(() => {
    // Wait for YouTube IFrame API to load
    if (window.YT && window.YT.Player) {
      initializePlayer()
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer()
      }
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          console.log('Error destroying player:', e)
        }
      }
    }
  }, [])

  // Initialize player when video changes
  useEffect(() => {
    if (window.YT && window.YT.Player && playerReadyRef.current) {
      const currentVideo = youtubeVideos[activeVideoIndex]
      if (currentVideo && playerRef.current) {
        try {
          playerRef.current.loadVideoById({
            videoId: currentVideo.id,
            startSeconds: 0
          })
          // Set mute state after loading
          setTimeout(() => {
            if (playerRef.current) {
              if (isMuted) {
                playerRef.current.mute()
              } else {
                playerRef.current.unMute()
              }
            }
          }, 500)
        } catch (e) {
          console.log('Error loading video:', e)
        }
      }
    }
  }, [activeVideoIndex])

  // Update mute state when isMuted changes - use postMessage to avoid reload
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const message = JSON.stringify({
          event: 'command',
          func: isMuted ? 'mute' : 'unMute',
          args: []
        })
        iframeRef.current.contentWindow.postMessage(message, 'https://www.youtube.com')
      } catch (e) {
        console.log('Error toggling mute:', e)
      }
    }
  }, [isMuted])

  const initializePlayer = () => {
    const currentVideo = youtubeVideos[activeVideoIndex]
    if (!currentVideo) return

    const playerId = `youtube-player-${activeVideoIndex}`
    
    // Create a container for the player
    const container = document.getElementById(playerId)
    if (!container) return

    try {
      playerRef.current = new window.YT.Player(playerId, {
        videoId: currentVideo.id,
        playerVars: {
          autoplay: 1,
          mute: isMuted ? 1 : 0,
          loop: 1,
          playlist: currentVideo.id,
          controls: 0,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          start: 0
        },
        events: {
          onReady: (event) => {
            playerReadyRef.current = true
            event.target.setPlaybackQuality('highres')
          },
          onStateChange: (event) => {
            // Track video time
            if (event.data === window.YT.PlayerState.PLAYING) {
              const updateTime = () => {
                if (playerRef.current && playerRef.current.getCurrentTime) {
                  try {
                    setVideoTime(playerRef.current.getCurrentTime())
                  } catch (e) {
                    // Ignore errors
                  }
                }
              }
              const interval = setInterval(() => {
                if (playerRef.current && playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
                  updateTime()
                } else {
                  clearInterval(interval)
                }
              }, 1000)
            }
          }
        }
      })
    } catch (e) {
      console.log('Error initializing player:', e)
    }
  }

  const toggleSound = () => {
    setIsMuted(!isMuted)
  }

  // Get current video URL with timestamp
  const getYouTubeUrlWithTime = () => {
    const currentVideo = youtubeVideos[activeVideoIndex]
    if (!currentVideo) return ''
    const timeParam = videoTime > 0 ? `&t=${Math.floor(videoTime)}` : ''
    return `${currentVideo.url}${timeParam}`
  }

  const handlePreviousThumbnails = () => {
    setThumbnailStartIndex((prev) => Math.max(0, prev - thumbnailsPerView))
  }

  const handleNextThumbnails = () => {
    setThumbnailStartIndex((prev) => 
      Math.min(youtubeVideos.length - thumbnailsPerView, prev + thumbnailsPerView)
    )
  }

  const canScrollLeft = thumbnailStartIndex > 0
  const canScrollRight = thumbnailStartIndex < youtubeVideos.length - thumbnailsPerView

  return (
    <section 
      id="home"
      className="relative w-full overflow-hidden bg-club-dark"
    >
      {/* YouTube Video Background - Full Screen Stretched */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Multiple Video Players */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            {youtubeVideos.map((video, index) => (
              index === activeVideoIndex && (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <iframe
                    ref={iframeRef}
                    key={video.id}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&start=0&enablejsapi=1`}
                    title={video.title}
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
                    onLoad={() => {
                      // Use postMessage to control mute without reloading
                      if (iframeRef.current && iframeRef.current.contentWindow) {
                        const message = JSON.stringify({
                          event: 'command',
                          func: isMuted ? 'mute' : 'unMute',
                          args: []
                        })
                        iframeRef.current.contentWindow.postMessage(message, 'https://www.youtube.com')
                      }
                    }}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Very subtle overlay for better logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-club-dark/20 pointer-events-none" style={{ zIndex: 10 }}></div>

        {/* Watch on YouTube text link - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-24 sm:bottom-28 right-6 z-30"
        >
          <motion.a
            href={getYouTubeUrlWithTime()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              const currentVideo = youtubeVideos[activeVideoIndex]
              if (currentVideo) {
                handleVideoClick(currentVideo.url)
              }
            }}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm sm:text-base font-medium transition-colors duration-300 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span>Watch on YouTube</span>
            <ExternalLink size={16} className="group-hover:text-club-blue transition-colors" />
          </motion.a>
        </motion.div>

        {/* Sound Toggle Button - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 right-6 z-30"
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              toggleSound()
            }}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-club-blue transition-all duration-300 hover:bg-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX size={20} className="text-white" />
            ) : (
              <Volume2 size={20} className="text-white" />
            )}
          </motion.button>
        </motion.div>

        {/* Logo Image prominently displayed over video */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-6 md:px-8 pointer-events-none">
          <motion.img
            src={getImagePath('assets/images/rtyu45mm.png')}
            alt="Club 7 Fitness"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-[85vw] sm:w-[75vw] md:w-auto max-w-[85vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl h-auto object-contain pointer-events-none"
            style={{
              filter: 'drop-shadow(0 10px 40px rgba(0, 0, 0, 0.8))',
            }}
          />
        </div>

        {/* Video Thumbnails Navigation with Arrows */}
        <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-30 w-full max-w-6xl px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
          >
            {/* Left Arrow */}
            {youtubeVideos.length > thumbnailsPerView && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: canScrollLeft ? 1 : 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePreviousThumbnails}
                disabled={!canScrollLeft}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-club-blue transition-all duration-300 ${
                  canScrollLeft ? 'cursor-pointer hover:bg-white/20' : 'cursor-not-allowed'
                }`}
                title="Previous videos"
              >
                <ChevronLeft 
                  size={20} 
                  className={`${canScrollLeft ? 'text-white' : 'text-white/40'}`} 
                />
              </motion.button>
            )}

            {/* Thumbnails Container */}
            <div 
              ref={thumbnailContainerRef}
              className="flex items-center justify-center gap-2"
              style={{ 
                width: 'auto',
              }}
            >
              <AnimatePresence mode="wait">
                {youtubeVideos
                  .slice(thumbnailStartIndex, thumbnailStartIndex + thumbnailsPerView)
                  .map((video, displayIndex) => {
                    const actualIndex = thumbnailStartIndex + displayIndex
                    return (
                      <motion.div
                        key={`${video.id}-${thumbnailStartIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleThumbnailClick(actualIndex)
                        }}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                          actualIndex === activeVideoIndex 
                            ? 'border-club-blue shadow-lg shadow-club-blue/50 scale-105' 
                            : 'border-white/30 hover:border-white/60'
                        }`}
                        style={{
                          width: '80px',
                          height: '60px',
                          minWidth: '80px',
                          maxWidth: '80px',
                          minHeight: '60px',
                          maxHeight: '60px',
                        }}
                        title={`Click to play: ${video.title}`}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Active indicator */}
                        {actualIndex === activeVideoIndex && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-club-blue/30 flex items-center justify-center"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-3 h-3 bg-club-blue rounded-full"
                            />
                          </motion.div>
                        )}
                        {/* Play icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
                          <Play size={16} className="text-white" fill="white" />
                        </div>
                      </motion.div>
                    )
                  })}
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            {youtubeVideos.length > thumbnailsPerView && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: canScrollRight ? 1 : 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextThumbnails}
                disabled={!canScrollRight}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-club-blue transition-all duration-300 ${
                  canScrollRight ? 'cursor-pointer hover:bg-white/20' : 'cursor-not-allowed'
                }`}
                title="Next videos"
              >
                <ChevronRight 
                  size={20} 
                  className={`${canScrollRight ? 'text-white' : 'text-white/40'}`} 
                />
              </motion.button>
            )}
          </motion.div>
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
