import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Typography, Container } from '@mui/material'
import { fadeInUp, slideInLeft, slideInRight } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'
import EnquiryForm from '../components/EnquiryForm'

const About = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-club-dark overflow-hidden">
      <Container maxWidth="lg" className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Banner with images */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative about-banner"
          >
            {/* Main banner image */}
            <motion.img
              src={getImagePath('assets/images/about-banner.png')}
              alt="About Club 7 Fitness"
              width="660"
              height="648"
              loading="lazy"
              className="w-full h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            {/* Circle 1 */}
            <motion.img
              src={getImagePath('assets/images/about-circle-one.png')}
              alt=""
              width="660"
              height="534"
              loading="lazy"
              aria-hidden="true"
              className="absolute circle circle-1 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 -top-8 -left-8 md:-top-12 md:-left-12"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Circle 2 */}
            <motion.img
              src={getImagePath('assets/images/about-circle-two.png')}
              alt=""
              width="660"
              height="534"
              loading="lazy"
              aria-hidden="true"
              className="absolute circle circle-2 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 -bottom-8 -right-8 md:-bottom-12 md:-right-12"
              animate={{
                y: [0, 20, 0],
                rotate: [0, -360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            />

            {/* Fitness image - absolute positioned */}
            <motion.img
              src={getImagePath('assets/images/fitness.png')}
              alt="fitness"
              width="650"
              height="154"
              loading="lazy"
              className="absolute abs-img w-full max-w-md bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="about-content space-y-6"
          >
            {/* Section Subtitle */}
            <motion.p
              className="section-subtitle text-club-blue text-sm uppercase tracking-widest font-semibold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.p>

            {/* Section Title */}
            <motion.h2
              className="h2 section-title text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-white">Welcome To Our </span>
              <span className="text-club-blue">Fitness Center</span>
            </motion.h2>

            {/* Section Text 1 */}
            <motion.p
              className="section-text text-club-steel text-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Transform your body and strengthen your mind at the best gym in town. Come be part of our team and achieve incredible results.
            </motion.p>

            {/* Section Text 2 */}
            <motion.p
              className="section-text text-club-steel text-lg leading-relaxed font-light mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover the power of overcoming in our academy, where challenges turn into achievements and limits are just the beginning. Be part of our community and transform your lifestyle once and for all.
            </motion.p>

            {/* Wrapper - Coach and Button */}
            <motion.div
              className="wrapper flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* About Coach */}
              <div className="about-coach flex items-center gap-4">
                <figure className="coach-avatar">
                  <motion.img
                    src={getImagePath('assets/images/about-coach.jpg')}
                    alt="Krishna Mohanty"
                    width="65"
                    height="65"
                    loading="lazy"
                    className="rounded-full object-cover border-2 border-club-blue/50"
                    whileHover={{ scale: 1.1, borderColor: '#3b82f6' }}
                    transition={{ duration: 0.3 }}
                  />
                </figure>
                <div>
                  <h3 className="h3 coach-name text-white text-xl font-bold mb-1 font-display">
                    Krishna Mohanty
                  </h3>
                  <p className="coach-title text-club-steel text-sm uppercase tracking-wider">
                    Our Coach
                  </p>
                </div>
              </div>

              {/* Learn More Button */}
              <Button
                variant="contained"
                className="btn btn-primary"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
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
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Enquiry Form Modal */}
      <EnquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  )
}

export default About
