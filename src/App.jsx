import React, { useState } from 'react';
import RandomLetterSwapNav from '@/components/ui/m-random-letter-swap-1';
import Hero from './components/Hero';
import About from './components/About';
import Trainers from './components/Trainers';
import ClassSchedule from './components/ClassSchedule';
import BookingForm from './components/BookingForm';

function App() {
  const [_selectedTrainer, setSelectedTrainer] = useState(null);
  const [_selectedClass, setSelectedClass] = useState(null);

  const handleSelectTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    console.log('Selected Trainer for booking:', trainer);
  };

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
    console.log('Selected Class for booking:', classItem);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      <RandomLetterSwapNav />
      <Hero />
      <About />
      <Trainers onSelectTrainer={handleSelectTrainer} />
      <ClassSchedule onSelectClass={handleSelectClass} />
      <BookingForm />
    </div>
  );
}

export default App;
