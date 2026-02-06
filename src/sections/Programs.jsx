import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@mui/material'
import { staggerContainer } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'

const classes = [
  {
    id: 1,
    title: 'Weightlifting',
    image: getImagePath('assets/images/class-1.jpg'),
    icon: getImagePath('assets/images/class-icon-1.png'),
    description: 'Overcome your limits and reach new heights with our weightlifting program.',
  },
  {
    id: 2,
    title: 'Cardio and Strength',
    image: getImagePath('assets/images/class-2.jpg'),
    icon: getImagePath('assets/images/class-icon-2.png'),
    description: 'Transform your fitness and achieve breathtaking health with our cardio program.',
  },
  {
    id: 3,
    title: 'Power Yoga',
    image: getImagePath('assets/images/class-3.jpg'),
    icon: getImagePath('assets/images/class-icon-3.png'),
    description: 'Explore the physical, mental and spiritual benefits of yoga on our online platform.',
  },
  {
    id: 4,
    title: 'Fitness Package',
    image: getImagePath('assets/images/class-4.jpg'),
    icon: getImagePath('assets/images/class-icon-4.png'),
    description: 'Transform your body and achieve your best form with our complete package for your gym success.',
  }
]

const ClassCard = ({ classItem, index, scrollX, containerRef }) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(index < 2)

  useEffect(() => {
    const updateVisibility = () => {
      if (cardRef.current && containerRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        
        // Card is visible if it's within the container viewport
        const isInView = 
          cardRect.left < containerRect.right &&
          cardRect.right > containerRect.left &&
          cardRect.left >= containerRect.left - 200 &&
          cardRect.right <= containerRect.right + 200
        
        setIsVisible(isInView)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', updateVisibility, { passive: true })
      updateVisibility() // Initial check
      
      return () => {
        container.removeEventListener('scroll', updateVisibility)
      }
    }
  }, [containerRef, scrollX])

  return (
    <motion.li
      ref={cardRef}
      className="scrollbar-item flex-shrink-0 w-[calc(100vw-64px)] sm:w-[calc(50vw-48px)] md:w-[416px] list-none snap-start"
      style={{
        scrollSnapAlign: 'start',
      }}
      initial={{ opacity: index < 2 ? 1 : 0.3, scale: index < 2 ? 1 : 0.95 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3,
        scale: isVisible ? 1 : 0.95,
      }}
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.4 }
      }}
    >
      <motion.div
        className="class-card bg-club-charcoal rounded-lg overflow-hidden border border-club-blue/10 hover:border-club-blue/50 transition-all duration-300 cursor-pointer h-full"
        whileHover={{
          boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
        }}
      >
        {/* Card Banner */}
        <figure className="card-banner img-holder relative overflow-hidden" style={{ width: '100%', height: '240px' }}>
          <motion.img
            src={classItem.image}
            alt={classItem.title}
            width="416"
            height="240"
            loading="lazy"
            className="img-cover w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </figure>

        {/* Card Content */}
        <div className="card-content p-6">
          {/* Title Wrapper */}
          <div className="title-wrapper flex items-center gap-4 mb-4">
            <motion.img
              src={classItem.icon}
              width="52"
              height="52"
              aria-hidden="true"
              alt=""
              className="title-icon"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className="h3 m-0">
              <a href="#" className="card-title text-white text-xl font-bold hover:text-club-blue transition-colors font-display no-underline">
                {classItem.title}
              </a>
            </h3>
          </div>

          {/* Card Text */}
          <p className="card-text text-club-steel text-base leading-relaxed font-light">
            {classItem.description}
          </p>
        </div>
      </motion.div>
    </motion.li>
  )
}

const Programs = () => {
  const scrollRef = useRef(null)
  const containerRef = useRef(null)
  const [scrollX, setScrollX] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollX(scrollRef.current.scrollLeft)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true })
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="programs" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-club-dark">
      <Container maxWidth="lg" className="container">
        {/* Section Subtitle */}
        <motion.p
          className="section-subtitle text-club-blue text-sm uppercase tracking-widest font-semibold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Classes
        </motion.p>

        {/* Section Title */}
        <motion.h2
          className="h2 section-title text-center text-4xl md:text-5xl lg:text-6xl font-black mb-12 md:mb-16 font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-white">Fitness Classes For </span>
          <span className="text-club-blue">Various Objectives</span>
        </motion.h2>

        {/* Class List - Show only 2 cards at a time */}
        <div className="w-full flex justify-center">
          <div 
            ref={containerRef}
            className="overflow-x-auto pb-4 md:max-w-[calc(416px*2+32px)]"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#3b82f6 #0f172a',
              width: '100%',
              maxWidth: 'calc(100vw - 48px)', // Mobile responsive
            }}
          >
            <motion.ul
              ref={scrollRef}
              className="class-list has-scrollbar flex gap-6 md:gap-8 list-none m-0 p-0"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              style={{
                WebkitOverflowScrolling: 'touch',
                display: 'flex',
                flexDirection: 'row',
                minWidth: 'max-content',
                scrollSnapType: 'x mandatory',
              }}
            >
              {classes.map((classItem, index) => (
                <ClassCard 
                  key={classItem.id} 
                  classItem={classItem} 
                  index={index}
                  scrollX={scrollX}
                  containerRef={containerRef}
                />
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Programs
