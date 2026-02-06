import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { staggerContainer, fadeInUp } from '../utils/motionVariants'
import { getImagePath } from '../utils/imagePath'

const testimonials = [
  {
    id: 1,
    name: 'Ravi Kumar',
    role: 'Bodybuilder & Trainer',
    image: getImagePath('assets/images/about-coach.jpg'), // You can replace with Ravi's image
    content: 'Club 7 Fitness has transformed my physique completely. The elite equipment and professional coaching helped me achieve my dream body. Best gym in Delhi!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Raj Sharma',
    role: 'Powerlifter',
    image: getImagePath('assets/images/class-1.jpg'), // You can replace with Raj's image
    content: 'The training environment here is unmatched. I\'ve broken all my personal records since joining. The coaches understand real strength training.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Aryan Singh',
    role: 'Fitness Enthusiast',
    image: getImagePath('assets/images/class-2.jpg'), // You can replace with Aryan's image
    content: 'From beginner to advanced, Club 7 has everything. The community is supportive and the results speak for themselves. Highly recommended!',
    rating: 5,
  },
]

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative bg-club-charcoal rounded-lg p-6 md:p-8 border border-club-steel/10 hover:border-club-blue/30 transition-all duration-300 overflow-hidden group"
      whileHover={{ y: -5 }}
    >
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-club-blue/5 rounded-full blur-3xl group-hover:bg-club-blue/10 transition-colors duration-300"></div>
      
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <motion.div
          className="relative mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-club-blue/30 group-hover:border-club-blue transition-colors duration-300"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-club-blue/20 blur-xl group-hover:bg-club-blue/40 transition-colors duration-300"></div>
        </motion.div>
        
        {/* Name and Role */}
        <div className="text-center">
          <h4 className="text-white font-bold text-lg mb-1">{testimonial.name}</h4>
          <p className="text-club-blue text-sm font-medium">{testimonial.role}</p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex justify-center gap-1 mb-4 relative z-10">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-club-blue text-club-blue"
          />
        ))}
      </div>

      {/* Quote icon */}
      <div className="mb-4 text-club-blue/40 relative z-10">
        <Quote size={32} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <p className="text-club-steel text-base md:text-lg font-light leading-relaxed relative z-10 text-center">
        "{testimonial.content}"
      </p>
    </motion.div>
  )
}

const Testimonials = () => {
  return (
        <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-club-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 font-display">
            BUILT BY <span className="text-club-blue">CHAMPIONS</span>
          </h2>
          <p className="text-club-steel text-lg md:text-xl font-light max-w-2xl mx-auto">
            Real athletes. Real results. Real talk.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
