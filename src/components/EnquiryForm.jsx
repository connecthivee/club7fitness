import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, TextField, Checkbox, FormControl, FormLabel, Box, Typography } from '@mui/material'
import { X, Send } from 'lucide-react'
import { getImagePath } from '../utils/imagePath'

const personalTrainingOptions = [
  { 
    id: 'strength', 
    label: 'Strength Training', 
    description: 'Build muscle and power',
    details: 'Transform your physique with our comprehensive strength training program. Focus on progressive overload, proper form, and muscle development. Perfect for building lean muscle mass and increasing overall strength.',
    image: '/assets/images/class-1.jpg'
  },
  { 
    id: 'cardio', 
    label: 'Cardio Conditioning', 
    description: 'Improve endurance and heart health',
    details: 'Boost your cardiovascular health with our dynamic cardio conditioning program. Includes running, cycling, rowing, and HIIT sessions designed to improve stamina, burn calories, and enhance heart health.',
    image: '/assets/images/class-2.jpg'
  },
  { 
    id: 'functional', 
    label: 'Functional Fitness', 
    description: 'Real-world movement patterns',
    details: 'Train movements, not just muscles. Our functional fitness program focuses on exercises that mimic daily activities, improving balance, coordination, and overall movement quality. Perfect for injury prevention and enhanced mobility.',
    image: '/assets/images/class-3.jpg'
  },
  { 
    id: 'weightloss', 
    label: 'Weight Loss Program', 
    description: 'Customized fat loss plan',
    details: 'Achieve sustainable weight loss with our personalized program combining effective workouts and nutrition guidance. Our trainers will create a customized plan tailored to your goals, metabolism, and lifestyle for long-term success.',
    image: '/assets/images/class-4.jpg'
  },
  { 
    id: 'bodybuilding', 
    label: 'Bodybuilding', 
    description: 'Competition-ready physique',
    details: 'Take your physique to the next level with our advanced bodybuilding program. Learn proper training splits, nutrition strategies, and posing techniques. Whether you\'re preparing for competition or just want to look your absolute best.',
    image: '/assets/images/about-banner.png'
  },
  { 
    id: 'yoga', 
    label: 'Yoga & Flexibility', 
    description: 'Mind-body connection',
    details: 'Find balance and inner strength through our yoga and flexibility program. Improve flexibility, reduce stress, enhance mindfulness, and build core strength. Suitable for all levels, from beginners to advanced practitioners.',
    image: '/assets/images/class-3.jpg'
  },
  { 
    id: 'hiit', 
    label: 'HIIT Training', 
    description: 'High-intensity interval training',
    details: 'Maximize your results in minimal time with our HIIT training program. High-intensity intervals followed by short recovery periods help you burn more calories, improve cardiovascular fitness, and build endurance faster than traditional workouts.',
    image: '/assets/images/class-4.jpg'
  },
  { 
    id: 'nutrition', 
    label: 'Nutrition Coaching', 
    description: 'Diet and meal planning',
    details: 'Fuel your body for optimal performance with our comprehensive nutrition coaching. Get personalized meal plans, macro calculations, supplement guidance, and ongoing support to help you reach your fitness goals through proper nutrition.',
    image: '/assets/images/about-coach.jpg'
  },
]

const EnquiryForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    trainingPrograms: [],
    message: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleProgramChange = (programId) => {
    setFormData(prev => {
      const currentPrograms = prev.trainingPrograms || []
      const isSelected = currentPrograms.includes(programId)
      
      const newPrograms = isSelected
        ? currentPrograms.filter(id => id !== programId)
        : [...currentPrograms, programId]
      
      return {
        ...prev,
        trainingPrograms: newPrograms
      }
    })
    
    // Clear error when user selects a program
    if (errors.trainingPrograms) {
      setErrors(prev => ({
        ...prev,
        trainingPrograms: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.trainingPrograms || formData.trainingPrograms.length === 0) {
      newErrors.trainingPrograms = 'Please select at least one training program'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Format WhatsApp message
    const selectedPrograms = personalTrainingOptions.filter(p => formData.trainingPrograms.includes(p.id))
    const programsList = selectedPrograms.map(p => `• ${p.label}`).join('\n')
    const programsDetails = selectedPrograms.map(p => `\n*${p.label}:*\n${p.details}`).join('\n\n')
    
    const whatsappMessage = `*New Enquiry - Club 7 Fitness*

*Name:* ${formData.name}
*Selected Training Programs:*
${programsList}
${programsDetails}
${formData.message ? `\n*Message:* ${formData.message}` : ''}

_I'm interested in joining Club 7 Fitness!_`

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const phoneNumber = '917008310868' // WhatsApp number without + or spaces
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    
    // Reset form
    setFormData({
      name: '',
      trainingPrograms: [],
      message: '',
    })
    
    // Close modal after a short delay
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-club-charcoal border border-club-blue/30 rounded-lg shadow-2xl max-w-4xl w-full mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
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
                className="absolute top-4 right-4 z-10 bg-club-dark/90 hover:bg-club-dark border border-club-blue/50 hover:border-club-blue rounded-full p-2 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} className="text-white group-hover:text-club-blue transition-colors" />
              </motion.button>

              {/* Form Content */}
              <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-6"
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 800,
                      fontFamily: 'Montserrat, sans-serif',
                      mb: 1,
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                    }}
                  >
                    Start Your <span style={{ color: '#3b82f6' }}>Journey</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#94a3b8',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    Fill in your details and we'll connect you with our team
                  </Typography>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#ffffff',
                          '& fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#94a3b8',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </motion.div>

                  {/* Training Program Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4"
                  >
                    <FormControl
                      component="fieldset"
                      error={!!errors.trainingPrograms}
                      fullWidth
                    >
                      <FormLabel
                        component="legend"
                        sx={{
                          color: '#94a3b8',
                          mb: 2,
                          '&.Mui-focused': {
                            color: '#3b82f6',
                          },
                        }}
                      >
                        Select Training Programs (Multiple Selection) <span style={{ color: '#ef4444' }}>*</span>
                      </FormLabel>
                      <div className="flex flex-col gap-4">
                        {/* First Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                          {personalTrainingOptions.slice(0, 4).map((option) => (
                            <motion.div
                              key={option.id}
                              onClick={() => handleProgramChange(option.id)}
                              className="relative cursor-pointer"
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                border: formData.trainingPrograms.includes(option.id)
                                  ? '2px solid #3b82f6'
                                  : '2px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '12px',
                                padding: '12px',
                                margin: 0,
                                backgroundColor: formData.trainingPrograms.includes(option.id)
                                  ? 'rgba(59, 130, 246, 0.1)'
                                  : 'rgba(26, 26, 26, 0.5)',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!formData.trainingPrograms.includes(option.id)) {
                                  e.currentTarget.style.borderColor = '#3b82f6'
                                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!formData.trainingPrograms.includes(option.id)) {
                                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'
                                  e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.5)'
                                }
                              }}
                            >
                              {/* Checkbox */}
                              <Checkbox
                                checked={formData.trainingPrograms.includes(option.id)}
                                onChange={() => handleProgramChange(option.id)}
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  zIndex: 2,
                                  color: 'rgba(59, 130, 246, 0.5)',
                                  '&.Mui-checked': {
                                    color: '#3b82f6',
                                  },
                                }}
                              />
                              {/* Card Content */}
                              <div className="relative w-full">
                                {/* Image */}
                                <div className="relative h-32 sm:h-36 md:h-40 mb-2 rounded-lg overflow-hidden">
                                  <img
                                    src={getImagePath(option.image)}
                                    alt={option.label}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                  <div className="absolute bottom-2 left-2 right-2">
                                    <div className="font-bold text-white text-xs sm:text-sm md:text-base">{option.label}</div>
                                    <div className="text-xs text-club-steel">{option.description}</div>
                                  </div>
                                </div>
                                {/* Details */}
                                <div className="text-xs sm:text-sm text-club-steel leading-relaxed line-clamp-2 sm:line-clamp-3">
                                  {option.details}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        {/* Second Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                          {personalTrainingOptions.slice(4, 8).map((option) => (
                            <motion.div
                              key={option.id}
                              onClick={() => handleProgramChange(option.id)}
                              className="relative cursor-pointer"
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                border: formData.trainingPrograms.includes(option.id)
                                  ? '2px solid #3b82f6'
                                  : '2px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '12px',
                                padding: '12px',
                                margin: 0,
                                backgroundColor: formData.trainingPrograms.includes(option.id)
                                  ? 'rgba(59, 130, 246, 0.1)'
                                  : 'rgba(26, 26, 26, 0.5)',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!formData.trainingPrograms.includes(option.id)) {
                                  e.currentTarget.style.borderColor = '#3b82f6'
                                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!formData.trainingPrograms.includes(option.id)) {
                                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'
                                  e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.5)'
                                }
                              }}
                            >
                              {/* Checkbox */}
                              <Checkbox
                                checked={formData.trainingPrograms.includes(option.id)}
                                onChange={() => handleProgramChange(option.id)}
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  zIndex: 2,
                                  color: 'rgba(59, 130, 246, 0.5)',
                                  '&.Mui-checked': {
                                    color: '#3b82f6',
                                  },
                                }}
                              />
                              {/* Card Content */}
                              <div className="relative w-full">
                                {/* Image */}
                                <div className="relative h-32 sm:h-36 md:h-40 mb-2 rounded-lg overflow-hidden">
                                  <img
                                    src={getImagePath(option.image)}
                                    alt={option.label}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                  <div className="absolute bottom-2 left-2 right-2">
                                    <div className="font-bold text-white text-xs sm:text-sm md:text-base">{option.label}</div>
                                    <div className="text-xs text-club-steel">{option.description}</div>
                                  </div>
                                </div>
                                {/* Details */}
                                <div className="text-xs sm:text-sm text-club-steel leading-relaxed line-clamp-2 sm:line-clamp-3">
                                  {option.details}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      {errors.trainingPrograms && (
                        <Typography
                          variant="caption"
                          sx={{ color: '#ef4444', mt: 1, display: 'block' }}
                        >
                          {errors.trainingPrograms}
                        </Typography>
                      )}
                    </FormControl>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <TextField
                      fullWidth
                      label="Additional Message (Optional)"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#ffffff',
                          '& fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#94a3b8',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={<Send size={20} />}
                      sx={{
                        py: { xs: 1.25, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
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
                      <span className="hidden sm:inline">Send Enquiry via WhatsApp</span>
                      <span className="sm:hidden">Send via WhatsApp</span>
                    </Button>
                  </motion.div>
                </form>
              </Box>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EnquiryForm

