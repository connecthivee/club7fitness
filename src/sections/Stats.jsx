import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Container } from '@mui/material'
import { fadeInUp } from '../utils/motionVariants'

const stats = [
  {
    id: 1,
    icon: '/assets/images/calories.svg',
    value: '500+',
    label: 'Calories Burned Daily',
    color: '#ef4444'
  },
  {
    id: 2,
    icon: '/assets/images/heart-rate.svg',
    value: '98%',
    label: 'Member Satisfaction',
    color: '#3b82f6'
  },
  {
    id: 3,
    icon: '/assets/images/fitness.png',
    value: '1000+',
    label: 'Workouts Completed',
    color: '#10b981'
  }
]

const StatCard = ({ stat, index }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.1,
        y: -10,
        transition: { duration: 0.4 }
      }}
      className="text-center"
    >
      <Box
        sx={{
          background: '#1a1a1a',
          borderRadius: '20px',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          p: 4,
          transition: 'all 0.4s ease',
          '&:hover': {
            border: '2px solid rgba(59, 130, 246, 0.5)',
            boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
          },
        }}
      >
        {/* Icon */}
        <motion.div
          className="flex justify-center mb-4"
          whileHover={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: 1.1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${stat.color}40`,
            }}
          >
            <img 
              src={stat.icon} 
              alt={stat.label}
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
          </Box>
        </motion.div>

        <Typography
          variant="h3"
          sx={{
            fontSize: '3rem',
            fontWeight: 900,
            color: stat.color,
            fontFamily: 'Montserrat, sans-serif',
            mb: 1,
          }}
        >
          {stat.value}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            color: '#94a3b8',
            fontSize: '1rem',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {stat.label}
        </Typography>
      </Box>
    </motion.div>
  )
}

const Stats = () => {
  return (
    <section className="relative py-16 md:py-24 px-6 md:px-12 bg-club-dark">
      <Container maxWidth="lg">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default Stats

