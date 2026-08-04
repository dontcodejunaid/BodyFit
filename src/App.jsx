import React, { useState } from "react";
import RandomLetterSwapNav from "./components/ui/m-random-letter-swap-1";
import Hero from "./components/Hero";
import About from "./components/About";
import Trainers from "./components/Trainers";
import ClassSchedule from "./components/ClassSchedule";
import Facilities from "./components/Facilities";
import MembershipPlans from "./components/MembershipPlans";
import Gallery from "./components/Gallery";
import Testimonials from "./components/TestimonialsSection";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

function App() {
  const [_selectedTrainer, setSelectedTrainer] = useState(null);
  const [_selectedClass, setSelectedClass] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    console.log("Selected Trainer for booking:", trainer);
  };

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
    console.log("Selected Class for booking:", classItem);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    console.log("Selected Plan for booking:", plan);
  };

  const handleClearPlan = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      <RandomLetterSwapNav />
      <Hero />
      <About />
      <Trainers onSelectTrainer={handleSelectTrainer} />
      <ClassSchedule onSelectClass={handleSelectClass} />
      <Facilities />
      <MembershipPlans onSelectPlan={handleSelectPlan} />
      <Gallery />
      <BookingForm
        selectedPlan={selectedPlan}
        onClearPlan={handleClearPlan}
      />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;