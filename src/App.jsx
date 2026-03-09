import { React, useEffect } from 'react';
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    })
  }, [])
  return (

    <main className='bg-gray-950'>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
