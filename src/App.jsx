import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import BookingForm from './components/BookingForm'
import Testimonials from "./components/Testimonials";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />
      <About />
      <BookingForm />
      <Testimonials />
    </div>
  )
}

export default App
