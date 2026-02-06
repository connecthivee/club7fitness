import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { Target, Award, Zap, Shield } from 'lucide-react'
import { staggerContainer, fadeInUp } from '../utils/motionVariants'

const pillars = [
  {
    id: 1,
    icon: Target,
    title: 'Elite Equipment',
    description: 'Top-tier machines, Olympic platforms, and professional-grade gear. No compromises.'
  },
  {
    id: 2,
    icon: Award,
    title: 'Expert Coaching',
    description: 'Certified trainers with decades of combined experience. Knowledge that transforms.'
  },
  {
    id: 3,
    icon: Zap,
    title: 'Serious Environment',
    description: 'Built for those who train with purpose. Zero distractions, maximum focus.'
  },
  {
    id: 4,
    icon: Shield,
    title: 'Community',
    description: 'Surrounded by driven athletes. Push each other. Grow together.'
  }
]

const PillarCard = ({ pillar }) => {
  const Icon = pillar.icon

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ 
        scale: 1.1,
        y: -15,
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
          overflow: 'visible',
          textAlign: 'center',
          transition: 'all 0.4s ease',
          '&:hover': {
            border: '2px solid rgba(59, 130, 246, 0.5)',
            boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Icon container with enhanced animation */}
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ 
              rotate: 360,
              scale: 1.2,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box
              sx={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                },
                '&:hover::before': {
                  opacity: 1,
                },
              }}
            >
              <Icon size={48} className="text-club-blue" strokeWidth={1.5} />
            </Box>
          </motion.div>

          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: '#ffffff',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {pillar.title}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: '#94a3b8',
              fontWeight: 300,
              lineHeight: 1.8,
              fontSize: '0.95rem',
            }}
          >
            {pillar.description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const WhyClub7 = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-club-dark to-club-charcoal">
      {/* Animated background accent */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-club-blue/5 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-24"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-6 font-display"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            WHY <span className="text-club-blue">CLUB 7</span>
          </motion.h2>
          <motion.p 
            className="text-club-steel text-lg md:text-xl font-light max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            We're not for everyone. We're for those who demand more.
          </motion.p>
        </motion.div>

        {/* Pillars grid with stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6"
        >
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </motion.div>

        {/* Animated divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-club-blue to-transparent"
        />
      </div>
    </section>
  )
}

export default WhyClub7
