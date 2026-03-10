import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className='bg-gray-950'>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] transition-all duration-75"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #7c3aed, #c026d3)',
          boxShadow: '0 0 8px rgba(139,92,246,0.8)',
        }}
      />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
          </>
        } />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
