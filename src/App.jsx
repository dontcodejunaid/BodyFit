import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import BookingForm from './components/BookingForm'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />
      <About />
      <BookingForm />
    </div>
  )
}

export default App
