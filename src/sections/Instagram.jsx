import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram as InstagramIcon, ExternalLink, Loader2 } from 'lucide-react'
import { staggerContainer, scaleIn } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'

const InstagramPost = ({ post, index }) => {
  return (
    <motion.a
      href={post.permalink || '#'}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      whileHover={{ 
        scale: 1.05,
        zIndex: 10,
        transition: { duration: 0.3 }
      }}
      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group block"
    >
      {/* Instagram image */}
      <img 
        src={post.media_url || post.image} 
        alt={post.caption || 'Instagram post'}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <InstagramIcon size={40} className="text-white" />
      </div>

      {/* Border effect */}
      <div className="absolute inset-0 border-2 border-club-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.a>
  )
}

const Instagram = () => {
  const [instagramPosts, setInstagramPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Instagram username from the URL
  const INSTAGRAM_USERNAME = 'club7_fitness_'
  const INSTAGRAM_URL = 'https://www.instagram.com/club7_fitness_?igsh=bDBscjR6cjl1Z2J5'

  useEffect(() => {
    // Function to fetch Instagram posts
    // Note: Instagram's official API requires authentication
    // For production, you'll need to set up Instagram Basic Display API or Graph API
    // This is a placeholder that shows how to structure the data
    
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true)
        
        // Option 1: If you have Instagram Basic Display API set up
        // Replace this with your actual API endpoint
        // const response = await fetch('YOUR_API_ENDPOINT')
        // const data = await response.json()
        
        // Option 2: Using a CORS proxy (for development only - not recommended for production)
        // This is a temporary solution. For production, use Instagram's official API
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.instagram.com/${INSTAGRAM_USERNAME}/?__a=1&__d=dis`)}`
        
        try {
          const response = await fetch(proxyUrl)
          const data = await response.json()
          
          if (data.contents) {
            const parsed = JSON.parse(data.contents)
            // Parse Instagram data structure
            if (parsed.graphql?.user?.edge_owner_to_timeline_media?.edges) {
              const posts = parsed.graphql.user.edge_owner_to_timeline_media.edges
                .slice(0, 6) // Get first 6 posts
                .map((edge, index) => ({
                  id: edge.node.id,
                  media_url: edge.node.display_url,
                  thumbnail_url: edge.node.thumbnail_src,
                  caption: edge.node.edge_media_to_caption?.edges[0]?.node?.text || '',
                  permalink: `https://www.instagram.com/p/${edge.node.shortcode}/`,
                  timestamp: edge.node.taken_at_timestamp,
                }))
              setInstagramPosts(posts)
              setLoading(false)
              return
            }
          }
        } catch (fetchError) {
          console.log('Instagram API fetch failed, using fallback images')
        }
        
        // Fallback: Use placeholder images if API fails
        // Replace these with actual Instagram post URLs or use a service
        const fallbackPosts = [
          { id: 1, image: getImagePath('assets/images/class-1.jpg'), caption: 'Strength Training', permalink: INSTAGRAM_URL },
          { id: 2, image: getImagePath('assets/images/class-2.jpg'), caption: 'Cardio Blast', permalink: INSTAGRAM_URL },
          { id: 3, image: getImagePath('assets/images/class-3.jpg'), caption: 'Yoga Session', permalink: INSTAGRAM_URL },
          { id: 4, image: getImagePath('assets/images/class-4.jpg'), caption: 'HIIT Workout', permalink: INSTAGRAM_URL },
          { id: 5, image: getImagePath('assets/images/about-banner.png'), caption: 'Training Facility', permalink: INSTAGRAM_URL },
          { id: 6, image: getImagePath('assets/images/video-banner.jpg'), caption: 'Group Training', permalink: INSTAGRAM_URL },
        ]
        
        setInstagramPosts(fallbackPosts)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching Instagram posts:', err)
        setError(err.message)
        setLoading(false)
        
        // Fallback on error
        const fallbackPosts = [
          { id: 1, image: getImagePath('assets/images/class-1.jpg'), caption: 'Strength Training', permalink: INSTAGRAM_URL },
          { id: 2, image: getImagePath('assets/images/class-2.jpg'), caption: 'Cardio Blast', permalink: INSTAGRAM_URL },
          { id: 3, image: getImagePath('assets/images/class-3.jpg'), caption: 'Yoga Session', permalink: INSTAGRAM_URL },
          { id: 4, image: getImagePath('assets/images/class-4.jpg'), caption: 'HIIT Workout', permalink: INSTAGRAM_URL },
          { id: 5, image: getImagePath('assets/images/about-banner.png'), caption: 'Training Facility', permalink: INSTAGRAM_URL },
          { id: 6, image: getImagePath('assets/images/video-banner.jpg'), caption: 'Group Training', permalink: INSTAGRAM_URL },
        ]
        setInstagramPosts(fallbackPosts)
      }
    }

    fetchInstagramPosts()
  }, [])

  return (
        <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-club-charcoal">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-display">
            FOLLOW THE <span className="text-club-blue">JOURNEY</span>
          </h2>
          <p className="text-club-steel text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
            Join our community. Daily inspiration, transformation stories, and real training.
          </p>
          
          {/* Instagram link */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-sm hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-shadow duration-300"
          >
            <InstagramIcon size={24} />
            <span>@{INSTAGRAM_USERNAME}</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={48} className="text-club-blue animate-spin" />
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-club-steel">Unable to load Instagram posts. Please visit our Instagram page directly.</p>
          </div>
        )}

        {/* Instagram grid */}
        {!loading && instagramPosts.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            {instagramPosts.map((post, index) => (
              <InstagramPost key={post.id || index} post={post} index={index} />
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-club-steel font-light">
            Tag us in your training for a feature
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Instagram
