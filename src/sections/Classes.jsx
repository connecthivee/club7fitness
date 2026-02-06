import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { staggerContainer, fadeInUp } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'

const classes = [
  {
    id: 1,
    title: 'Strength Training',
    image: getImagePath('assets/images/class-1.jpg'),
    icon: getImagePath('assets/images/class-icon-1.png'),
    time: '6:00 AM - 7:00 AM',
    trainer: 'Sanaya Singh'
  },
  {
    id: 2,
    title: 'Cardio Blast',
    image: getImagePath('assets/images/class-2.jpg'),
    icon: getImagePath('assets/images/class-icon-2.png'),
    time: '7:00 AM - 8:00 AM',
    trainer: 'Priyanka Ray'
  },
  {
    id: 3,
    title: 'Yoga & Flexibility',
    image: getImagePath('assets/images/class-3.jpg'),
    icon: getImagePath('assets/images/class-icon-3.png'),
    time: '8:00 AM - 9:00 AM',
    trainer: 'David Rodriguez'
  },
  {
    id: 4,
    title: 'HIIT Training',
    image: getImagePath('assets/images/class-4.jpg'),
    icon: getImagePath('assets/images/class-icon-4.png'),
    time: '9:00 AM - 10:00 AM',
    trainer: 'Emma Wilson'
  }
]

const ClassCard = ({ classItem, index }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.4 }
      }}
      className="h-full"
    >
      <Card
        sx={{
          height: '100%',
          background: '#1a1a1a',
          borderRadius: '16px',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.4s ease',
          '&:hover': {
            border: '2px solid rgba(59, 130, 246, 0.5)',
            boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
          },
        }}
      >
        {/* Image */}
        <CardMedia
          component="img"
          height="240"
          image={classItem.image}
          alt={classItem.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />

        {/* Icon overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 60,
            height: 60,
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}
        >
          <img 
            src={classItem.icon} 
            alt={classItem.title}
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              color: '#ffffff',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {classItem.title}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <span style={{ color: '#3b82f6' }}>⏰</span> {classItem.time}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <span style={{ color: '#3b82f6' }}>👤</span> {classItem.trainer}
            </Typography>
          </Box>
        </CardContent>

        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: 'linear-gradient(to top, rgba(59, 130, 246, 0.2) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </Card>
    </motion.div>
  )
}

const Classes = () => {
  return (
    <section 
      id="classes"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-club-dark"
      style={{
        backgroundImage: `url(${getImagePath('assets/images/classes-bg.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-club-dark/90"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-4 font-display"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            TRAINING <span className="text-club-blue">CLASSES</span>
          </motion.h2>
          <motion.p 
            className="text-club-steel text-lg md:text-xl font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Expert-led sessions. Structured programs. Real results.
          </motion.p>
        </motion.div>

        {/* Classes grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {classes.map((classItem, index) => (
            <ClassCard key={classItem.id} classItem={classItem} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Classes

