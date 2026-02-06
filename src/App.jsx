import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Programs from './sections/Programs'
import Classes from './sections/Classes'
import Gallery from './sections/Gallery'
import Instagram from './sections/Instagram'
import Testimonials from './sections/Testimonials'
import Footer from './sections/Footer'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-club-dark">
        <Header />
        <Hero />
        <About />
        <Programs />
        <Classes />
        <Gallery />
        <Instagram />
        <Testimonials />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

